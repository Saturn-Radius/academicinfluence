import dateFormat from "date-fns/format";
import { Node, NodeType, parse } from "node-html-parser";
import smartQuotes from "smart-quotes";
import { SchoolPageRequest, SchoolPageResponse } from "../api";
import databasePool from "../databasePool";
import * as squel from "../squel";
import { calculateScore } from "./collegeRankings";

export default async function serveSchoolPage(request: SchoolPageRequest): Promise<SchoolPageResponse> {

    const pool = await databasePool;

    const schoolQuery = squel.select().from("editor.ai_schools")
        .join("ai_data.schools", undefined, "ai_data.schools.id = editor.ai_schools.id")
        .where("ai_schools.slug = ?", request.slug)
        .field("schools.name")
        .field("coalesce(nullif(ai_schools.description, ''), schools.description)", "description")
        .field("city")
        .field("state")
        .field("median_sat")
        .field("median_act")
        .field("undergrad_tuition_in_state")
        .field("average_earnings")
        .field("desirability")
        .field("location")
        .field("graduation_rate")
        .field(squel.rstr("admissions::float / applications::float"), "acceptance_rate")
        .field(squel.rstr("undergraduate_students + graduate_students"), "total_students")
        .field("logo_url")
        .field(calculateScore(1900, 2020, null).where("scores.id = schools.id"), "influence_score")
        .toString()

    console.log(schoolQuery)

    const school = (await pool.query(schoolQuery)).rows[0]
    return {
        school: {
            ...school
        }
   }
}