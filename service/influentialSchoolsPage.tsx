import databasePool from "../databasePool";
import { influenceScoreQuery } from "../influenceScore";
import { InfluentialSchoolsPageRequest, InfluentialSchoolsPageResponse } from "../schema";
import * as squel from "../squel";

export default async function serveInfluentialSchools(request: InfluentialSchoolsPageRequest): Promise<InfluentialSchoolsPageResponse> {

    const pool = await databasePool;

    const query= squel.select().from("ai_data.schools")
        .join("editor.ai_schools", undefined, "ai_schools.id = schools.id")
        .field("slug")
        .field("name")
        .field("city")
        .field("state")
        .field("coalesce(nullif(ai_schools.description, ''), schools.description)", "description")
        .field("undergrad_tuition_in_state")
        .field("average_earnings")
        .field("graduation_rate")
        .field(squel.rstr("admissions::float / applications::float"), "acceptance_rate")
        .field(influenceScoreQuery('school', 1900, 2020).where("scores.id = schools.id and keyword is null"), "influence_score")
        .field(squel.select().from(influenceScoreQuery('school', 1900, 2020).where("scores.id = schools.id")
            .where("keyword is not null").field("keyword"), 'data')
            .join("editor.ai_disciplines", undefined, "ai_disciplines.id = data.keyword")
            .order("influence", false)
            .limit(1)
            .field("ai_disciplines.name"), "top_discipline")
        .field("logo_url")
        .order("influence_score", false)
        .where("? is not null", influenceScoreQuery('school', 1900, 2020).where("scores.id = schools.id and keyword is null"))
        .limit(30)


    console.log(query.toString())


  

    const queryResult = await pool.query(query.toParam())


    return {
        schools: queryResult.rows
    }
}