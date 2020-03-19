import { Dictionary } from "lodash";
import { QueryResult } from "pg";
import { DisciplineInfluenceData } from "./schema";
import { EntityType, lookupBySlug } from "./service/entityDatabase";
import * as squel from "./squel";
import { ERAS } from "./utils/years";

export function influenceScoreColumn(start_year: number, stop_year: number) {
  return squel.str(
    "ln(greatest(scores.era_scores[?] - scores.era_scores[?], 0) + exp(1.0)) / 15",
    ERAS.indexOf(stop_year) + 1,
    ERAS.indexOf(start_year) + 1
  );
}
export function influenceScoreQuery(
  kind: string,
  start_year: number,
  stop_year: number
) {
  const query = squel
    .select()
    .from(squel.rstr("ai_data.scores"))
    .field(influenceScoreColumn(start_year, stop_year), "influence")
    .where("scores.kind = ?", kind);

  return query;
}

export function disciplineBreakdownQuery(
  entityType: EntityType,
  slug: string,
  over_time: boolean = false
) {
  const query = lookupBySlug(entityType, slug)
    .join(
      "ai_data.scores",
      undefined,
      entityType.data_table +
        ".id = scores.id and scores.kind = '" +
        entityType.kind +
        "'"
    )
    .left_join(
      "editor.ai_disciplines",
      undefined,
      "ai_disciplines.id = scores.keyword"
    )
    .field("ai_disciplines.name")
    .field("scores.keyword")
    .field("world_rank")
    .field("usa_rank")
    .field(influenceScoreColumn(-4000, 2020), "influence")
    .order("influence", false)
    .where(
      "scores.keyword is null or (ai_disciplines.name is not null and ai_disciplines.active)"
    );

  if (over_time) {
    query.field("by_year").field("year_start");
  }

  return query.execute();
}

export function extractDisciplineBreakdownWithYears(result: QueryResult<any>) {
  let overall = null;
  let by_year = undefined;
  const disciplines: Dictionary<DisciplineInfluenceData> = {};
  for (const row of result.rows) {
    if (row.name === null) {
      overall = {
        influence: row.influence,
        world_rank: row.world_rank,
        usa_rank: row.usa_rank
      };
      if (row.by_year) {
        by_year = row.by_year.map((value: any, index: number) => ({
          value,
          year: row.year_start + index
        }));
      }
    } else {
      disciplines[row.name] = {
        influence: row.influence,
        world_rank: row.world_rank,
        usa_rank: row.usa_rank
      };
    }
  }
  return {
    overall: overall as DisciplineInfluenceData,
    disciplines,
    influence_over_time: by_year
  };
}

export function extractDisciplineBreakdown(result: QueryResult<any>) {
  const data = extractDisciplineBreakdownWithYears(result);
  return {
    overall: data.overall,
    disciplines: data.disciplines
  };
}
