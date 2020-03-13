import { disciplineNameToSlug } from "../disciplines";
import { influenceScoreQuery } from "../influenceScore";
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
    .field("logo_url")
    .field(
      squel
        .select()
        .from(
          influenceScoreQuery("school", 1900, 2020)
            .where("scores.id = schools.id")
            .where("keyword is not null")
            .field("keyword"),
          "data"
        )
        .join(
          "editor.ai_disciplines",
          undefined,
          "ai_disciplines.id = data.keyword"
        )
        .where("ai_disciplines.active")
        .order("influence", false)
        .limit(1)
        .field("ai_disciplines.name"),
      "top_discipline"
    )
    .field(
      squel
        .select()
        .from(
          influenceScoreQuery("school", 1900, 2020)
            .where("scores.id = schools.id")
            .where("keyword is not null")
            .field("world_rank")
            .field("keyword"),
          "data"
        )
        .join(
          "editor.ai_disciplines",
          undefined,
          "ai_disciplines.id = data.keyword"
        )
        .where("ai_disciplines.active")
        .order("influence", false)
        .limit(1)
        .field("data.world_rank"),
      "top_discipline_rank"
    );
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
    logo_url: row.logo_url,
    top_discipline: disciplineNameToSlug(row.top_discipline),
    top_discipline_rank: row.top_discipline_rank
  };
}
