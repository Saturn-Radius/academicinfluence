import {
  EntityQuery,
  EntityType,
  extractDescribableFields,
  extractOverall
} from "./entityDatabase";

export function addPartialPersonFields(select: EntityQuery) {
  return select
    .addDescribableFields(PERSON_ENTITY_TYPE)
    .field("image_url")
    .field("image_source_url")
    .field("birth_year")
    .field("death_year");
}

export function extractPartialPerson(row: any) {
  return {
    ...extractDescribableFields(row),
    image_url: row.image_url,
    image_source_url: row.image_source_url,
    birth_year: row.birth_year,
    death_year: row.death_year
  };
}

export function extractPartialPersonWithOverall(row: any) {
  return {
    ...extractPartialPerson(row),
    overall: extractOverall(row)
  };
}

export const PERSON_ENTITY_TYPE: EntityType = {
  kind: "person",
  data_table: "ai_data.people",
  editor_table: "editor.ai_people"
};
