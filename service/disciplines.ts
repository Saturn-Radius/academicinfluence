import databasePool from "../databasePool";
import { disciplineNameToSlug } from "../disciplines";
import { DisciplinesRequest, DisciplinesResponse } from "../schema";
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
      .field("editor.ai_disciplines.superdiscipline")
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

  const disciplines = [];
  for (const discipline of (await superdisciplineQuery).rows) {
    disciplines.push({
      level: 1,
      parent: disciplineNameToSlug(discipline.superdiscipline),
      name: discipline.name,
      slug: disciplineNameToSlug(discipline.name)
    });
  }

  for (const discipline of (await subdisciplineQuery).rows) {
    disciplines.push({
      level: 2,
      parent: disciplineNameToSlug(discipline.parent),
      name: discipline.name,
      slug: disciplineNameToSlug(discipline.name)
    });
  }

  return disciplines;
}
