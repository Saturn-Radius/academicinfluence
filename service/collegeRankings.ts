import {API, COLLEGE_RANKING_SORTS} from "../api"

import { config } from "dotenv";
import { Pool } from "pg";
import * as squel from "../squel"

async function createDatabasePool() {
    config();
    const pool = new Pool();
    return pool
}
export const databasePool = createDatabasePool();

function calculateScore(start_year: number, stop_year: number) {
    const start = squel.str("GREATEST(ai_data.scores.year_start,?)::float - ai_data.scores.year_start", start_year);
    const end = squel.str("LEAST(scores.year_end + 1,?)::float - ai_data.scores.year_start", stop_year); 

    const a_term = squel.str("scores.a * (? - ?)", end, start);
    const b_term = squel.str("scores.b * (power(?, 2) - power(?,2)) / 2", end, start);
    const c_term = squel.str("scores.c * (power(?, 3) - power(?,3)) / 3", end, start);

    const expression = squel.str("? + ? + ?", a_term, b_term, c_term)

    const adapted = squel.str("ln(? + exp(1.0)) / 15.0", expression)

    return squel.select()
        .from(squel.rstr("ai_data.scores"))
        .where("keyword is null")
        .field(adapted)
}

export async function serveCollegeRankings(request: API['collegeRankings']['request']): Promise<API['collegeRankings']['response']> {
    if (!COLLEGE_RANKING_SORTS[request.sort]) {
        throw new Error("Invalid sort")
    }

    const pool = await databasePool;
    const query = squel.select()
        .from(squel.select()
        .from(squel.rstr("ai_data.schools"))
        .field("id")
        .field("name")
        .field("city")
        .field("state")
        .field("median_sat")
        .field("median_act")
        .field("undergrad_tuition_in_state")
        .field("average_earnings")
        .field(squel.rstr("admissions::float / applications::float"), "acceptance_rate")
        .field(squel.rstr("undergraduate_students + graduate_students"), "total_students")
        .field(calculateScore(-4000, 3000).where("scores.id = schools.id"), "influence_score")
        .where("usa"), "data")
        .order(request.sort, request.reversed)
        .where(request.sort + ' is not null')
        .limit(25)

    const queryResult = await pool.query(query.toParam())

    return {
        schools: queryResult.rows
    }
}