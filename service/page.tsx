import { databaseQuery } from "../databasePool";
import { PageRequest, PageResponse } from "../schema";
import * as squel from "../squel";
import processHtml from "./processHtml";

export default async function servePage(
  request: PageRequest
): Promise<PageResponse | null> {
  const data = await databaseQuery(
    squel
      .select()
      .from("editor.ai_pages")
      .where("key = ?", request)
      .field("text", "content")
      .field("title")
  );

  const row = data.rows[0];
  if (row === undefined) {
    return null;
  } else {
    return {
      title: row.title,
      content: await processHtml(row.content)
    };
  }
}
