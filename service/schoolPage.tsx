import { Dictionary } from "lodash";
import databasePool from "../databasePool";
import { influenceScoreQuery } from "../influenceScore";
import {
  DisciplineInfluenceData,
  SchoolPageRequest,
  SchoolPageResponse
} from "../schema";
import * as squel from "../squel";
import { extractPartialPerson } from "./databasePerson";
const months = require("months");

// 800-200
const SAT_SCORES = [
  99,
  99,
  99,
  99,
  99,
  99,
  99,
  99,
  99,
  98,
  98,
  98,
  98,
  97,
  97,
  97,
  97,
  96,
  96,
  95,
  95,
  93,
  94,
  92,
  93,
  91,
  92,
  90,
  90,
  87,
  89,
  85,
  87,
  84,
  85,
  82,
  83,
  79,
  81,
  77,
  78,
  74,
  76,
  72,
  73,
  69,
  69,
  66,
  67,
  62,
  64,
  60,
  60,
  56,
  56,
  53,
  53,
  50,
  49,
  46,
  46,
  43,
  43,
  40,
  39,
  36,
  35,
  33,
  32,
  30,
  29,
  27,
  26,
  24,
  23,
  21,
  21,
  19,
  18,
  16,
  15,
  14,
  13,
  12,
  11,
  11,
  10,
  9,
  8,
  8,
  7,
  6,
  6,
  5,
  5,
  4,
  4,
  3,
  3,
  3,
  3,
  2,
  2,
  2,
  2,
  1,
  2,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1
];

function lookupSatMath(score: number) {
  return SAT_SCORES[Math.round((80 - score / 10) * 2 + 1)];
}
function lookupSatVerbal(score: number) {
  return SAT_SCORES[Math.round((80 - score / 10) * 2)];
}

function calcTemp(temps: number[], start: number, end: number) {
  let total = 0;
  for (let index = start; index < end; index++) {
    total += temps[index];
  }
  return total / (end - start);
}

function calcSeason(
  maximums: number[],
  minimums: number[],
  start: number,
  end: number
) {
  return {
    high: calcTemp(maximums, start, end),
    low: calcTemp(minimums, start, end)
  };
}

function calcWeather(maximums: number[], minimums: number[]) {
  if (maximums.length == 0 || minimums.length == 0) {
    return null;
  }
  return {
    winter: calcSeason(maximums, minimums, 0, 3),
    spring: calcSeason(maximums, minimums, 3, 6),
    summer: calcSeason(maximums, minimums, 6, 9),
    fall: calcSeason(maximums, minimums, 9, 12)
  };
}

export default async function serveSchoolPage(
  request: SchoolPageRequest
): Promise<SchoolPageResponse> {
  const pool = await databasePool;

  const schoolQuery = pool.query(
    squel
      .select()
      .from("editor.ai_schools")
      .join(
        "ai_data.schools",
        undefined,
        "ai_data.schools.id = editor.ai_schools.id"
      )
      .where("ai_schools.slug = ?", request.slug)
      .field("schools.name")
      .field(
        "coalesce(nullif(ai_schools.description, ''), schools.description)",
        "description"
      )
      .field("slug")
      .field("city")
      .field("state")
      .field("median_sat")
      .field("median_act")
      .field("undergrad_tuition_in_state")
      .field("undergrad_tuition_out_of_state")
      .field("grad_tuition_in_state")
      .field("grad_tuition_out_of_state")
      .field("undergrad_fees_in_state")
      .field("undergrad_fees_out_of_state")
      .field("grad_fees_in_state")
      .field("grad_fees_out_of_state")
      .field("average_net_price")
      .field("average_earnings")
      .field("employed_10_years")
      .field("desirability")
      .field("desirability_rank")
      .field("graduation_rate")
      .field("weather_maximums")
      .field("weather_minimums")
      .field(
        squel.rstr("admissions::float / applications::float"),
        "acceptance_rate"
      )
      .field(
        squel.rstr("undergraduate_students + graduate_students"),
        "total_students"
      )
      .field("logo_url")
      .field("campus_property_crime_rate")
      .field("campus_violent_crime_rate")
      .field("city_property_crime_rate")
      .field("city_violent_crime_rate")
      .field("null", "top_discipline")
      .toString()
  );

  const influenceQuery = pool.query(
    influenceScoreQuery("school", 1900, 2020)
      .join("editor.ai_schools", undefined, "editor.ai_schools.id = scores.id")
      .where("editor.ai_schools.slug = ?", request.slug)
      .left_join(
        "editor.ai_disciplines",
        undefined,
        "ai_disciplines.id = scores.keyword"
      )
      .field("ai_disciplines.name")
      .field("scores.keyword")
      .field("world_rank")
      .field("usa_rank")
      .field("year_start")
      .field("by_year")
      .order("influence", false)
      .where("scores.keyword is null or ai_disciplines.name is not null")
      .toParam()
  );

  const personQuery = pool.query(
    influenceScoreQuery("person", 1900, 2020)
      .where("keyword is null")
      .join(
        "ai_data.person_schools",
        undefined,
        "person_schools.person_id = scores.id"
      )
      .join(
        "editor.ai_schools",
        undefined,
        "editor.ai_schools.id = person_schools.school_id"
      )
      .where("ai_schools.slug = ?", request.slug)
      .join("editor.ai_people", undefined, "editor.ai_people.id = scores.id")
      .join("ai_data.people", undefined, "ai_people.id = people.id")
      .field("ai_people.slug")
      .field("people.name")
      .field("world_rank")
      .field("usa_rank")
      .field(
        "coalesce(nullif(ai_people.description, ''), people.description)",
        "description"
      )
      .order("influence", false)
      .limit(3)
      .toString()
  );

  const alumniQuery = pool.query(
    influenceScoreQuery("person", 1900, 2020)
      .where("keyword is null")
      .join(
        "ai_data.person_schools",
        undefined,
        "person_schools.person_id = scores.id"
      )
      .where("person_schools.relationship = ?", "Student")
      .join(
        "editor.ai_schools",
        undefined,
        "editor.ai_schools.id = person_schools.school_id"
      )
      .where("ai_schools.slug = ?", request.slug)
      .join("editor.ai_people", undefined, "editor.ai_people.id = scores.id")
      .join("ai_data.people", undefined, "ai_people.id = people.id")
      .field("ai_people.slug")
      .field("people.name")
      .field("world_rank")
      .field("usa_rank")
      .field(
        "coalesce(nullif(ai_people.description, ''), people.description)",
        "description"
      )
      .order("influence", false)
      .limit(3)
      .toParam()
  );

  const school = (await schoolQuery).rows[0];

  let overall = null;
  let over_time = [];

  const influences: Dictionary<DisciplineInfluenceData> = {};
  for (const row of (await influenceQuery).rows) {
    if (row.name === null) {
      overall = {
        influence: row.influence,
        world_rank: row.world_rank,
        usa_rank: row.usa_rank
      };
      over_time = row.by_year.map((value: number, index: number) => ({
        year: index + row.year_start,
        value
      }));
    } else {
      influences[row.name] = {
        influence: row.influence,
        world_rank: row.world_rank,
        usa_rank: row.usa_rank
      };
    }
  }

  return {
    school: {
      description: school.description,
      name: school.name,
      slug: school.slug,
      city: school.city,
      state: school.state,
      median_act: school.median_act,
      median_sat: school.median_sat,
      undergrad_tuition_in_state: school.undergrad_tuition_in_state,
      average_earnings: school.average_earnings,
      graduation_rate: school.graduation_rate,
      total_students: school.total_students,
      acceptance_rate: school.acceptance_rate,
      desirability: school.desirability,
      logo_url: school.logo_url,
      top_discipline: school.top_discipline,
      employed_10_years: school.employed_10_years,
      desirability_rank: school.desirability_rank,
      undergrad_tuition_out_of_state: school.undergrad_tuition_out_of_state,
      grad_tuition_out_of_state: school.grad_tuition_out_of_state,
      grad_tuition_in_state: school.grad_tuition_in_state,

      undergrad_fees_in_state: school.undergrad_fees_in_state,
      undergrad_fees_out_of_state: school.undergrad_fees_out_of_state,
      grad_fees_in_state: school.grad_fees_in_state,
      grad_fees_out_of_state: school.grad_fees_out_of_state,

      average_net_price: school.average_net_price,
      campus_property_crime_rate: school.campus_property_crime_rate,
      campus_violent_crime_rate: school.campus_violent_crime_rate,
      city_property_crime_rate: school.city_property_crime_rate,
      city_violent_crime_rate: school.city_violent_crime_rate,
      test_competitiveness: lookupSatMath(school.median_sat / 2) / 100,
      overall: overall as DisciplineInfluenceData,
      disciplines: influences,
      people: (await personQuery).rows.map(extractPartialPerson),
      alumni: (await alumniQuery).rows.map(extractPartialPerson),
      weather: calcWeather(school.weather_maximums, school.weather_minimums),
      influence_over_time: over_time
    }
  };
}
