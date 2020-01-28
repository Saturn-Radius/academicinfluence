import { Dictionary } from "lodash";
import { SchoolDisciplineInfluenceData, SchoolPageRequest, SchoolPageResponse } from "../api";
import databasePool from "../databasePool";
import { influenceScoreQuery } from "../influenceScore";
import * as squel from "../squel";

export default async function serveSchoolPage(request: SchoolPageRequest): Promise<SchoolPageResponse> {

    const pool = await databasePool;

    const schoolQuery = pool.query(squel.select().from("editor.ai_schools")
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
        .field("desirability_rank")
        .field("location")
        .field("graduation_rate")
        .field(squel.rstr("admissions::float / applications::float"), "acceptance_rate")
        .field(squel.rstr("undergraduate_students + graduate_students"), "total_students")
        .field("logo_url")
        .toString())

    const influenceQuery = pool.query(influenceScoreQuery(1900, 2020)
        .join("editor.ai_schools", undefined, "editor.ai_schools.id = scores.id")
        .where("editor.ai_schools.slug = ?", request.slug)
        .left_join("editor.ai_disciplines", undefined, "ai_disciplines.id = scores.keyword")
        .field("ai_disciplines.name")
        .field("scores.keyword")
        .field("world_rank")
        .field("usa_rank")
        .order("influence", false)
        .where("scores.keyword is null or ai_disciplines.name is not null")
        .toParam())

    const school = (await schoolQuery).rows[0]

    const influences: Dictionary<SchoolDisciplineInfluenceData> = {}
    for (const row of (await influenceQuery).rows) {
        influences[row.name || ""] = {
            influence: row.influence,
            world_rank: row.world_rank,
            usa_rank: row.usa_rank
        }
    }
    return {
        school: {
            ...school,
            disciplines: influences
            
        }
   }
}