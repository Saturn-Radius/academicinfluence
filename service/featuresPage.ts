import dateFormat from "date-fns/format";
import { parseDOM } from "htmlparser2";
import { omit } from "lodash";
import React from "react";
import { processNodes } from "react-html-parser";
import smartQuotes from "smart-quotes";
import databasePool from "../databasePool";
import { FeaturesPageRequest, FeaturesPageResponse, Html } from "../schema";
import SHORTCODES, { ResolvePromise } from "../shortcodes";
import * as squel from "../squel";
function allChildren(child: any) {
  return React.Children.map(child, x => x) || [];
}

function dereact(node: ReactPiece): Html {
  if (node == null) {
    return "";
  }
  if (typeof node !== "object") {
    return node;
  } else {
    const children: Html[] = [];
    React.Children.forEach(node.props.children, (child: React.ReactElement) => {
      children.push(dereact(child));
    });
    return {
      component: node.type === React.Fragment ? "" : (node.type as string),
      props: omit(node.props, "children"),
      children
    };
  }
}

type ReactPiece = string | number | React.ReactElement;

function hasUnresolved(element: ReactPiece) {
  if (typeof element === "object") {
    if (element.type in SHORTCODES) {
      return true;
    }
    if (element.type === ResolvePromise) {
      return true;
    }
    if (element.props && "children" in element.props) {
      if (allChildren(element.props.children).some(hasUnresolved)) {
        return true;
      }
    }
  }

  return false;
}

async function resolveElements(element: ReactPiece): Promise<ReactPiece> {
  if (typeof element !== "object") {
    return element;
  } else if (element.type in SHORTCODES) {
    const component = element.type as string;
    return SHORTCODES[component](element.props as any);
  } else if (element.type === ResolvePromise) {
    return element.props.children(await element.props.promise);
  } else {
    const children: ReactPiece[] = [];
    const kids = React.Children.map(element.props.children, child => child);
    if (kids !== null && kids !== undefined) {
      for (const child of kids) {
        children.push(await resolveElements(child));
      }
    }
    return React.cloneElement(element, undefined, ...children);
  }
}

async function processHtml(html: string): Promise<Html[]> {
  const document = parseDOM(html, {
    decodeEntities: true,
    lowerCaseTags: false
  });
  let elements: ReactPiece[] = processNodes(document, undefined as any);
  while (elements.some(hasUnresolved)) {
    elements = await Promise.all(elements.map(resolveElements));
  }

  const htmls = elements.map(dereact);
  return htmls;
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

  const article = articleQuery && (await articleQuery).rows[0];

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
    article: article && {
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
