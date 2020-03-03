import databasePool from "../databasePool";
import { DisciplineRequest, DisciplineResponse } from "../schema";
import * as squel from "../squel";
import processHtml from "./processHtml";

export default async function serveDiscipline(
  request: DisciplineRequest
): Promise<DisciplineResponse> {
  const pool = await databasePool;

  const data = await pool.query(
    squel
      .select()
      .from("editor.ai_disciplines")
      .where("lower(name) = ?", request.replace(/-/g, " "))
      .field("description")
      .field("name")
      .toParam()
  );

  const row = data.rows[0];

  return {
    name: row.name,
    description: await processHtml(row.description)
  };
}
