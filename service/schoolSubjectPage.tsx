import databasePool from "../databasePool";
import { influenceScoreQuery } from "../influenceScore";
import { SchoolSubjectPageRequest, SchoolSubjectPageResponse } from "../schema";
import { addPartialPersonFields, extractPartialPerson } from "./databasePerson";
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

export default async function serveSchoolSubjectPage(
  request: SchoolSubjectPageRequest
): Promise<SchoolSubjectPageResponse> {
  const pool = await databasePool;

  const baseQuery = addPartialPersonFields(
    influenceScoreQuery("person", 1900, 2020)
      .join(
        "editor.ai_disciplines",
        undefined,
        "ai_disciplines.id = scores.keyword"
      )
      .where(
        "lower(ai_disciplines.name) = lower(?)",
        request.discipline.replace(/-/g, " ")
      )
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
      .order("influence", false)
      .limit(10)
  );

  const alumniQuery = pool.query(
    baseQuery
      .clone()
      .where("person_schools.relationship = ?", "Student")
      .toParam()
  );

  const staffQuery = pool.query(
    baseQuery
      .clone()
      .where("person_schools.relationship = ?", "Staff")
      .toParam()
  );

  return {
    alumni: (await alumniQuery).rows.map(extractPartialPerson),
    staff: (await staffQuery).rows.map(extractPartialPerson)
  };
}
