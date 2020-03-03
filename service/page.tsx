import databasePool from "../databasePool";
import { PageRequest, PageResponse } from "../schema";
import * as squel from "../squel";
import processHtml from "./processHtml";

export default async function servePage(
  request: PageRequest
): Promise<PageResponse> {
  const pool = await databasePool;

  const data = await pool.query(
    squel
      .select()
      .from("editor.ai_pages")
      .where("key = ?", request)
      .field("text", "content")
      .toParam()
  );

  const row = data.rows[0];

  return {
    content: await processHtml(row.content)
  };
}
