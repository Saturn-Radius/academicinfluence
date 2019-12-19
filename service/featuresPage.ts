import * as squel from "../squel"
import { CollegeRankingsRequest, CollegeRankingsResponse, FeaturesPageRequest, FeaturesPageResponse } from "../api";
import databasePool from "../databasePool"
import dateFormat from "date-fns/format"
import smartQuotes from "smart-quotes"

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
        

    const articleQuery = pool.query(
        squel.select().from("editor.ai_features")
            .field("title")
            .field("excerpt")
            .field("featured_image")
            .field("modified_date_time")
            .field("users.name", "username")
            .order("added_date_time", true)
            .join("editor.users", undefined, "users.id = ai_features.added_by")
            .where("status = ?", "PUBLISHED")
            .limit(6)
            .toParam())
        console.log(request)
        console.log(await categoryQuery)
    return {
        category: categoryQuery && (await categoryQuery).rows.map(
            row => ({
                name: row.name,
                slug: row.slug,
                description: smartQuotes(row.description)
            }))[0],
        categories: (await categoriesQuery).rows,
        articles: (await articleQuery).rows.map(article => ({
            title: article.title,
            excerpt: smartQuotes(article.excerpt),
            featuredImage: article.featured_image,
            date: dateFormat(article.modified_date_time, "MMM. d"),
            author: article.username

        }))
    }
}