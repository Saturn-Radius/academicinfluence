import * as squel from "../squel";
import {
  EntityQuery,
  EntityType,
  extractDescribableFields,
  extractOverall
} from "./entityDatabase";

export function addPartialPersonFields(select: EntityQuery) {
  return select
    .addDescribableFields(PERSON_ENTITY_TYPE)
    .field(
      squel.str(
        "case when (image_url = '') then (? || image) else (image_url) END",
        "/api/wmcimage/"
      ),
      "image_url"
    )
    .field(
      squel.str(
        "case when image_url = ''then ? || image else image_source_url end",
        "https://commons.wikimedia.org/wiki/File:"
      ),
      "image_source_url"
    );
}

export function extractPartialPerson(row: any) {
  return {
    ...extractDescribableFields(row),
    image_url: row.image_url,
    image_source_url: row.image_source_url
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
