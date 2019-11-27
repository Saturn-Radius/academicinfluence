import { NextApiResponse, NextApiRequest } from "next";
import { config } from "dotenv";
import { Pool } from "pg";
import * as squel from "../../squel"

async function createDatabasePool() {
    config();

    const pool = new Pool();
    console.log("GOT POOL", pool)
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

export default async (req: NextApiRequest, response: NextApiResponse) => {

    const pool = await databasePool;
    const query = squel.select()
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
        .where("usa")
        .where("?", squel.rstr("? is not null", calculateScore(1900, 2020).where("scores.id = schools.id")))
        .order("influence_score", false)
        .limit(25)
        console.log(query.toString())
    const queryResult = await pool.query(query.toParam()
        )
        console.log("resolved")

    response.status(200).json({
        schools: queryResult.rows
    })
}