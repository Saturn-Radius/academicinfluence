import { databaseQuery } from "../databasePool";
import { BasicContextRequest, BasicContextResponse } from "../schema";
import * as squel from "../squel";
import { disciplineNameToSlug } from "../utils/disciplines";

export default async function serveBasicContext(
  request: BasicContextRequest
): Promise<BasicContextResponse> {
  const superdisciplineQuery = databaseQuery(
    squel
      .select()
      .from("editor.ai_disciplines")
      .field("editor.ai_disciplines.name")
      .field("editor.ai_disciplines.superdiscipline")
      .where("active")
  );

  const subdisciplineQuery = databaseQuery(
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
      .where("ai_subdisciplines.active")
  );

  const countriesQuery = databaseQuery(
    squel
      .select()
      .from("ai_data.schools")
      .field("country")
      .group("country")
      .order("country")
      .where("country is not null")
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

  const countries = (await countriesQuery).rows.map(row => ({
    name: row.country
  }));

  return {
    disciplines,
    countries
  };
}
