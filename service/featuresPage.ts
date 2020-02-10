import dateFormat from "date-fns/format";
import { HTMLElement, Node, NodeType, parse } from "node-html-parser";
import smartQuotes from "smart-quotes";
import databasePool from "../databasePool";
import { FeaturesPageRequest, FeaturesPageResponse, Html, HtmlNode } from "../schema";
import * as squel from "../squel";
import SHORTCODES from "../shortcodes"
import { omit } from "lodash";
import React from "react";

function transformNode(node: Node): Html {
  switch (node.nodeType) {
    case NodeType.TEXT_NODE:
      return smartQuotes(node.rawText);
    case NodeType.ELEMENT_NODE:
      const element = node as HTMLElement;
      
      return {
        component: element.tagName,
        props: element.attributes,
        children: node.childNodes.map(transformNode)
      };
  }
}

function dereact(node: React.ReactElement | string): Html {
  if (typeof node == "string") {
    return node
  } else {
    return {
      component: node.type as string,
      props: omit(node.props, 'children'),
      children: React.Children.map(node.props.children, dereact)
    }
  }
}

async function resolveNodes(nodes: Html[]): Promise<Html[] | null> {
  const shortCodeNodes: {[k: string]: HtmlNode[]} = {}
  let hasShortcodes = false;

  function walk(node: Html) {
    if (typeof node !== "string") {
      const shortCode = SHORTCODES[node.component]
      if (shortCode !== undefined) {
        hasShortcodes = true;
        
        if ((shortCode as any).resolve !== undefined) {
          if (!(node.component in shortCodeNodes)) {
            shortCodeNodes[node.component] = [node]
          } else {
            shortCodeNodes[node.component].push(node)
          }
          // do not walk children
          return;
        }

      }
      for (const child of node.children) {
        walk(child)
      }
    }
  }

  for (const node of nodes) {
    walk(node)
  }

  if (hasShortcodes) {

    await Promise.all(Object.entries(shortCodeNodes).map(([key, nodes]) => (SHORTCODES[key] as any).resolve(nodes)))

    const resolve = (node: Html): Html => {
      if (typeof node === "string") {
        return node
      } else {
        const shortCode = SHORTCODES[node.component]
        if (shortCode !== undefined) {
          return dereact(shortCode(node.props, node.children))
        } else {
          return {
            component: node.component,
            props: node.props,
            children: node.children.map(resolve)
          }
        }
      }
    }
    return nodes.map(resolve)
  } else {
    return null
  }
}


async function processHtml(html: string): Promise<Html[]> {
  const root = parse(html);
  let nodes = (transformNode(root) as any).children;
  while (1) {
    let resolved = await resolveNodes(nodes)
    if (resolved == null) {
      break;
    } else {
      nodes = resolved
    }
  }

  return nodes;
}

export default async function serveFeaturesPage(
  request: FeaturesPageRequest
): Promise<FeaturesPageResponse> {
  const pool = await databasePool;

  const categoriesQuery = pool.query(
    squel
      .select()
      .from("editor.ai_categories")
      .field("name")
      .field("slug")
      .order("name")
      .where(
        "exists ?",
        squel
          .select()
          .from("editor.ai_features")
          .where("ai_features.category = ai_categories.id")
          .where("ai_features.status = ?", "PUBLISHED")
      )

      .toParam()
  );

  const categoryQuery =
    request.category === null
      ? null
      : pool.query(
          squel
            .select()
            .from("editor.ai_categories")
            .field("name")
            .field("slug")
            .field("description")
            .where("slug = ?", request.category)
            .toParam()
        );

  const articlesQueryBuilder = squel
    .select()
    .from("editor.ai_features")
    .field("title")
    .field("excerpt")
    .field("ai_features.slug", "slug")
    .field("modified_date_time")
    .field("users.name", "username")
    .field("ai_categories.slug", "category_slug")
    .field("ai_categories.name", "category_name")
    .field("hero_image_banner_url")
    .field("hero_image_thumbnail_url")
    .order("added_date_time", true)
    .join("editor.users", undefined, "users.id = ai_features.added_by")
    .join(
      "editor.ai_categories",
      undefined,
      "editor.ai_categories.id = ai_features.category"
    )
    .where("status = ?", "PUBLISHED")
    .limit(6);

  if (request.category !== null) {
    articlesQueryBuilder.where("ai_categories.slug = ?", request.category);
  }

  const articlesQuery = pool.query(articlesQueryBuilder.toParam());

  const articleQuery =
    request.article === null
      ? null
      : pool.query(
          squel
            .select()
            .from("editor.ai_features")
            .field("title")
            .field("ai_features.slug")
            .field("content")
            .field("excerpt")
            .field("hero_image_banner_url")
            .field("hero_image_thumbnail_url")
            .field("modified_date_time")
            .field("users.name", "username")
            .join("editor.users", undefined, "users.id = ai_features.added_by")
            .where("ai_features.slug = ?", request.article)
            .join(
              "editor.ai_categories",
              undefined,
              "editor.ai_categories.id = ai_features.category"
            )
            .field("ai_categories.slug", "category_slug")
            .field("ai_categories.name", "category_name")
            .limit(1)
            .toParam()
        );

  const articles = (await articlesQuery).rows.map(article => ({
    name: article.title,
    excerpt: smartQuotes(article.excerpt),
    bannerUrl: article.hero_image_banner_url,
    thumbnailUrl: article.hero_image_thumbnail_url,
    date: dateFormat(article.modified_date_time, "MMM. d"),
    author: article.username,
    slug: article.slug,
    category: {
      slug: article.category_slug,
      name: article.category_name
    }
  }));

  while (articles.length < 6) {
    articles.push(articles[0]);
  }

  const article = articleQuery && (await articleQuery).rows[0]

  return {
    category:
      categoryQuery &&
      (await categoryQuery).rows.map(row => ({
        name: row.name,
        slug: row.slug,
        description: smartQuotes(row.description)
      }))[0],
    categories: (await categoriesQuery).rows,
    articles,
    article:
      article && {
        name: article.title,
        slug: article.slug,
        content: await processHtml(article.content),
        excerpt: smartQuotes(article.excerpt),
        author: article.username,
        bannerUrl: article.hero_image_banner_url,
        thumbnailUrl: article.hero_image_thumbnail_url,
        date: dateFormat(article.modified_date_time, "MMM. d"),
        category: {
          slug: article.category_slug,
          name: article.category_name
        }
      }
  };
}
