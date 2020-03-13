import { databaseQuery } from "../databasePool";
import { CollegeRankingsRequest, CollegeRankingsResponse } from "../schema";
import * as squel from "../squel";
import { extractOverall, lookupAll } from "./entityDatabase";
import {
  addPartialSchoolFields,
  extractPartialSchoolFields,
  SCHOOL_ENTITY_TYPE
} from "./schoolDatabase";

export default async function serveCollegeRankings(
  request: CollegeRankingsRequest
): Promise<CollegeRankingsResponse> {
  const innerQuery = lookupAll(SCHOOL_ENTITY_TYPE)
    .apply(addPartialSchoolFields)
    .addInfluenceFields(SCHOOL_ENTITY_TYPE, undefined, request.discipline)
    .field("location");

  const query = squel
    .select()
    .from(innerQuery.inner(), "data")
    .where(
      "undergrad_tuition_in_state >= ? and undergrad_tuition_in_state <= ?",
      request.tuition.min * 1000,
      request.tuition.max * 1000
    )
    .where(
      "median_sat >= ? and median_sat  <= ?",
      request.median_sat.min * 10,
      request.median_sat.max * 10
    )
    .where(
      "total_students >= ? and total_students  <= ?",
      request.total_students.min * 1000,
      request.total_students.max * 1000
    )
    .where(
      "data.acceptance_rate >= ? and data.acceptance_rate  <= ?",
      request.acceptance_rate.min / 100,
      request.acceptance_rate.max / 100
    )
    .order(request.sort, request.reversed)
    .where(request.sort + " is not null")
    .limit(50);
  if (request.states !== null) {
    query.where("state in ?", request.states);
  }
  if (request.location !== null) {
    const encoded = `SRID=4326;POINT(${request.location.long} ${request.location.lat})`;
    query.where(
      "location <-> ? >= ?",
      encoded,
      request.location.distance.min * 1609.34
    );
    query.where(
      "location <-> ? <= ?",
      encoded,
      request.location.distance.max * 1609.34
    );
  }

  const sentQuery = databaseQuery(query);

  const limitQuery = databaseQuery(
    squel
      .select()
      .from(innerQuery.inner(), "data")
      .field(squel.rstr("max(undergrad_tuition_in_state)"), "max_tuition")
      .field(squel.rstr("min(undergrad_tuition_in_state)"), "min_tuition")
      .field(squel.rstr("max(median_sat)"), "max_sat")
      .field(squel.rstr("min(median_sat)"), "min_sat")
      .field(squel.rstr("max(acceptance_rate)"), "max_acceptance_rate")
      .field(squel.rstr("min(acceptance_rate)"), "min_acceptance_rate")
      .field(squel.rstr("max(total_students)"), "max_total_students")
      .field(squel.rstr("min(total_students)"), "min_total_students")
  );

  const queryResult = await sentQuery;
  const limitResult = await limitQuery;

  return {
    schools: queryResult.rows.map(row => ({
      ...extractPartialSchoolFields(row),
      overall: extractOverall(row)
    })),
    limits: {
      tuition: {
        min: Math.floor((limitResult.rows[0].min_tuition || 0) / 1000),
        max: Math.ceil((limitResult.rows[0].max_tuition || 100000) / 1000)
      },
      median_sat: {
        min: Math.floor((limitResult.rows[0].min_sat || 0) / 10),
        max: Math.ceil((limitResult.rows[0].max_sat || 1600) / 10)
      },
      acceptance_rate: {
        min: Math.floor((limitResult.rows[0].min_acceptance_rate || 0) * 100),
        max: Math.floor((limitResult.rows[0].max_acceptance_rate || 1) * 100)
      },
      total_students: {
        min: Math.floor((limitResult.rows[0].min_total_students || 0) / 1000),
        max: Math.ceil((limitResult.rows[0].max_total_students || 1600) / 1000)
      },
      years: {
        min: 1800,
        max: 2020
      }
    }
  };
}
