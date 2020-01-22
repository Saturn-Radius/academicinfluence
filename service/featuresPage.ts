import dateFormat from "date-fns/format";
import { Node, NodeType, parse } from "node-html-parser";
import smartQuotes from "smart-quotes";
import { FeaturesPageRequest, FeaturesPageResponse } from "../api";
import databasePool from "../databasePool";
import * as squel from "../squel";

function processHtml(html: string): string {
    console.log(html)
    const root = parse('<root>' + html + '</root>');
    const target = ""
    function traverse(node: Node) {
        switch (node.nodeType) {
            case NodeType.TEXT_NODE:
                node.rawText = smartQuotes(node.rawText)
                break;
            case NodeType.ELEMENT_NODE:
                for (const child of node.childNodes) {
                    traverse(child)
                }
                break;
        }
    }
    for (const child of root.childNodes) {
        traverse(child)
    }
    return (root.childNodes[0] as any).innerHTML
}

export default async function serveFeaturesPage(request: FeaturesPageRequest): Promise<FeaturesPageResponse> {

    const pool = await databasePool;

    const categoriesQuery = pool.query(squel.select().from("editor.ai_categories")
        .field("name")
        .field("slug")
        .order("name")
        .where("exists ?", squel.select().from("editor.ai_features")
        .where("ai_features.category = ai_categories.id")
        .where("ai_features.status = ?", "PUBLISHED")
        )

        .toParam())

    const categoryQuery = request.category === null ? null : pool.query(squel.select().from("editor.ai_categories")
        .field("name")
        .field("slug")
        .field("description")
        .where("slug = ?", request.category)
        .toParam())
        
    const articlesQueryBuilder = squel.select().from("editor.ai_features")
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
            .join("editor.ai_categories", undefined, "editor.ai_categories.id = ai_features.category")
            .where("status = ?", "PUBLISHED")
            .limit(6)

    if (request.category !== null) {
        articlesQueryBuilder.where("ai_categories.slug = ?", request.category)
    }

    const articlesQuery = pool.query(
        articlesQueryBuilder
            .toParam())

    const articleQuery = request.article === null ? null : pool.query(
        squel.select().from("editor.ai_features")
            .field("title")
            .field("content")
            .field("excerpt")
            .field("hero_image_banner_url")
            .field("hero_image_thumbnail_url")
            .field("modified_date_time")
            .field("users.name", "username")
            .join("editor.users", undefined, "users.id = ai_features.added_by")
            .where("ai_features.slug = ?", request.article)
            .limit(1)
            .toParam())

    const articles = (await articlesQuery).rows.map(article => ({
            title: article.title,
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
        }))


    while( articles.length < 6) {
        articles.push(articles[0])
    }



    return {
        category: categoryQuery && (await categoryQuery).rows.map(
            row => ({
                name: row.name,
                slug: row.slug,
                description: smartQuotes(row.description)
            }))[0],
        categories: (await categoriesQuery).rows,
        articles,
        article: articleQuery && (await articleQuery).rows.map(
            row => ({
                title: row.title,
                content: processHtml(row.content),
                excerpt: smartQuotes(row.excerpt),
                author: row.username,
                bannerUrl: row.hero_image_banner_url,
                thumbnailUrl: row.hero_image_thumbnail_url,
                date: dateFormat(row.modified_date_time, "MMM. d"),
            }))[0],
    }
}