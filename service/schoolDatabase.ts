import * as squel from "../squel";
import {
  EntityQuery,
  EntityType,
  extractDescribableFields
} from "./entityDatabase";

export const SCHOOL_ENTITY_TYPE: EntityType = {
  kind: "school",
  editor_table: "editor.ai_schools",
  data_table: "ai_data.schools"
};

export function addPartialSchoolFields(query: EntityQuery) {
  return query
    .addDescribableFields(SCHOOL_ENTITY_TYPE)
    .field("city")
    .field("state")
    .field("median_act")
    .field("median_sat")
    .field("undergrad_tuition_in_state")
    .field("average_earnings")
    .field("graduation_rate")
    .field(
      squel.rstr("admissions::float / applications::float"),
      "acceptance_rate"
    )
    .field(
      squel.rstr("undergraduate_students + graduate_students"),
      "total_students"
    )
    .field("desirability")
    .field("logo_url");
}

export function extractPartialSchoolFields(row: any) {
  return {
    ...extractDescribableFields(row),
    city: row.city,
    state: row.state,
    median_act: row.median_act,
    median_sat: row.median_sat,
    undergrad_tuition_in_state: row.undergrad_tuition_in_state,
    average_earnings: row.average_earnings,
    graduation_rate: row.graduation_rate,
    total_students: row.total_students,
    acceptance_rate: row.acceptance_rate,
    desirability: row.desirability,
    logo_url: row.logo_url
  };
}
