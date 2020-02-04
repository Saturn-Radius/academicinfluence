import { Dictionary } from "lodash";
import { DisciplinesRequest, DisciplinesResponse } from "../schema";
import databasePool from "../databasePool";
import * as squel from "../squel";

export default async function serveDisciplines(
  request: DisciplinesRequest
): Promise<DisciplinesResponse> {
  const pool = await databasePool;

  const superdisciplineQuery = pool.query(
    squel
      .select()
      .from("editor.ai_disciplines")
      .field("editor.ai_disciplines.name")
      .toParam()
  );

  const subdisciplineQuery = pool.query(
    squel
      .select()
      .from("editor.ai_subdisciplines")
      .field("editor.ai_subdisciplines.name", "name")
      .field("editor.ai_disciplines.name", "parent")
      .join(
        "editor.ai_disciplines",
        undefined,
        "editor.ai_disciplines.id = editor.ai_subdisciplines.parent"
      )
      .toParam()
  );

  const disciplines: Dictionary<{
    parent: string | null;
  }> = {};
  for (const discipline of (await superdisciplineQuery).rows) {
    disciplines[discipline.name] = {
      parent: null
    };
  }

  for (const discipline of (await subdisciplineQuery).rows) {
    disciplines[discipline.name] = {
      parent: discipline.parent
    };
  }

  return disciplines;
}
