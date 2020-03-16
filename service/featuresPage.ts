import dateFormat from "date-fns/format";
import smartQuotes from "smart-quotes";
import { databaseQuery } from "../databasePool";
import { FeaturesPageRequest, FeaturesPageResponse } from "../schema";
import * as squel from "../squel";
import processHtml from "./processHtml";

export default async function serveFeaturesPage(
  request: FeaturesPageRequest
): Promise<FeaturesPageResponse> {
  const categoriesQuery = databaseQuery(
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
          .from("editor.ai_articles")
          .where("ai_articles.kind = 'feature'")
          .where("ai_articles.category = ai_categories.id")
          .where("ai_articles.status = ?", "PUBLISHED")
      )
  );

  const categoryQuery =
    request.category === null
      ? null
      : databaseQuery(
          squel
            .select()
            .from("editor.ai_categories")
            .field("name")
            .field("slug")
            .field("description")
            .where("slug = ?", request.category)
        );

  const articlesQueryBuilder = squel
    .select()
    .from("editor.ai_articles")
    .field("title")
    .field("excerpt")
    .field("ai_articles.slug", "slug")
    .field("modified_date_time")
    .field("users.name", "username")
    .field("ai_categories.slug", "category_slug")
    .field("ai_categories.name", "category_name")
    .field("hero_image_banner_url")
    .field("hero_image_thumbnail_url")
    .order("added_date_time", true)
    .join("editor.users", undefined, "users.id = ai_articles.added_by")
    .join(
      "editor.ai_categories",
      undefined,
      "editor.ai_categories.id = ai_articles.category"
    )
    .where("status = ?", "PUBLISHED")
    .limit(6);

  if (request.category !== null) {
    articlesQueryBuilder.where("ai_categories.slug = ?", request.category);
  }

  const articlesQuery = databaseQuery(articlesQueryBuilder);

  const articleQuery =
    request.article === null
      ? null
      : databaseQuery(
          squel
            .select()
            .from("editor.ai_articles")
            .field("title")
            .field("ai_articles.slug")
            .field("content")
            .field("excerpt")
            .field("hero_image_banner_url")
            .field("hero_image_thumbnail_url")
            .field("modified_date_time")
            .field("users.name", "username")
            .join("editor.users", undefined, "users.id = ai_articles.added_by")
            .where("ai_articles.slug = ?", request.article)
            .join(
              "editor.ai_categories",
              undefined,
              "editor.ai_categories.id = ai_articles.category"
            )
            .field("ai_categories.slug", "category_slug")
            .field("ai_categories.name", "category_name")
            .limit(1)
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
