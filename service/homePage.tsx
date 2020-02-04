import databasePool from "../databasePool";
import { HomePageRequest, HomePageResponse } from "../schema";
import * as squel from "../squel";

export default async function serveHomePage(request: HomePageRequest): Promise<HomePageResponse> {

    const pool = await databasePool;

    const homePageQuery = await pool.query(squel.select().from("editor.ai_home_pages")
        .left_join("editor.ai_features", undefined, "ai_features.id = ai_home_pages.current_feature")
        .left_join("editor.ai_categories", undefined, "editor.ai_categories.id = ai_features.category")
        .where("editor.ai_home_pages.id = ?", '5f6455fa-ce87-4118-b165-52090c76caad')
        .field("editor.ai_features.title", "name")
        .field("ai_features.hero_image_banner_url")
        .field("ai_features.hero_image_thumbnail_url")
        .field("ai_features.slug") 
        .field("ai_categories.slug", "category_slug")
        .toParam())

    const homePage = homePageQuery.rows[0]
    return {
        currentFeature: {
            name: homePage.name,
            bannerUrl: homePage.hero_image_banner_url,
            thumbnailUrl: homePage.hero_image_thumbnail_url,
            slug: homePage.slug,
            category: {
                slug: homePage.category_slug,
                name: ''
            },
            excerpt: "",
            author: "",
            date: ""
        }
    }
}