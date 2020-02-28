import { PersonPartialData } from "../schema";
import {
  EntityQuery,
  EntityType,
  extractDescribableFields,
  extractOverall
} from "./entityDatabase";

export function addPartialPersonFields(select: EntityQuery) {
  return select
    .addDescribableFields(PERSON_ENTITY_TYPE)
    .field("world_rank")
    .field("usa_rank");
}

export function extractPartialPerson(row: any): PersonPartialData {
  return {
    ...extractDescribableFields(row),
    overall: extractOverall(row)
  };
}

export const PERSON_ENTITY_TYPE: EntityType = {
  kind: "person",
  data_table: "ai_data.people",
  editor_table: "editor.ai_people"
};
