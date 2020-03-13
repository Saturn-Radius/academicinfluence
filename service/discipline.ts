import { databaseQuery } from "../databasePool";
import { DisciplineRequest, DisciplineResponse } from "../schema";
import * as squel from "../squel";
import processHtml from "./processHtml";

export default async function serveDiscipline(
  request: DisciplineRequest
): Promise<DisciplineResponse> {
  const data = await databaseQuery(
    squel
      .select()
      .from("editor.ai_disciplines")
      .where("lower(name) = ?", request.replace(/-/g, " "))
      .field("description")
      .field("name")
  );

  const row = data.rows[0];

  return {
    name: row.name,
    description: await processHtml(row.description)
  };
}
