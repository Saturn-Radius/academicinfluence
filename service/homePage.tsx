import { databaseQuery } from "../databasePool";
import { HomePageRequest, HomePageResponse } from "../schema";
import * as squel from "../squel";

export default async function serveHomePage(
  request: HomePageRequest
): Promise<HomePageResponse> {
  const homePageQuery = await databaseQuery(
    squel
      .select()
      .from("editor.ai_home_pages")
      .left_join(
        "editor.ai_articles",
        undefined,
        "ai_articles.id = ai_home_pages.current_feature"
      )
      .left_join(
        "editor.ai_categories",
        undefined,
        "editor.ai_categories.id = ai_articles.category"
      )
      .where(
        "editor.ai_home_pages.id = ?",
        "5f6455fa-ce87-4118-b165-52090c76caad"
      )
      .field("editor.ai_articles.title", "name")
      .field("ai_articles.hero_image_banner_url")
      .field("ai_articles.hero_image_thumbnail_url")
      .field("ai_articles.slug")
      .field("ai_categories.slug", "category_slug")
  );

  const homePage = homePageQuery.rows[0];
  return {
    currentFeature: {
      name: homePage.name,
      bannerUrl: homePage.hero_image_banner_url,
      thumbnailUrl: homePage.hero_image_thumbnail_url,
      slug: homePage.slug,
      category: {
        slug: homePage.category_slug,
        name: ""
      },
      excerpt: "",
      author: "",
      date: ""
    }
  };
}
