import dateFormat from "date-fns/format";
import { Node, NodeType, parse } from "node-html-parser";
import smartQuotes from "smart-quotes";
import { HomePageRequest, HomePageResponse } from "../api";
import databasePool from "../databasePool";
import * as squel from "../squel";

export default async function serveHomePage(request: HomePageRequest): Promise<HomePageResponse> {

    const pool = await databasePool;

    const homePageQuery = await pool.query(squel.select().from("editor.ai_home_pages")
        .left_join("editor.ai_features", undefined, "ai_features.id = ai_home_pages.current_feature")
        .left_join("editor.images", "featured_image", "featured_image.id = ai_features.featured_image_main")
        .left_join("editor.ai_categories", undefined, "editor.ai_categories.id = ai_features.category")
        .where("editor.ai_home_pages.id = ?", '5f6455fa-ce87-4118-b165-52090c76caad')
        .field("editor.ai_features.title")
        .field("featured_image.slug", "image")
        .field("ai_features.slug") 
        .field("ai_categories.slug", "category_slug")
        .toParam())

    console.log(homePageQuery)

    const homePage = homePageQuery.rows[0]
    return {
        currentFeature: {
            title: homePage.title,
            image: homePage.image,
            slug: homePage.slug,
            category: homePage.category_slug
        }
    }
}