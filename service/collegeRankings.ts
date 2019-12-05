import { config } from "dotenv";
import { Pool } from "pg";
import * as squel from "../squel"
import { CollegeRankingsRequest, CollegeRankingsResponse } from "../api";

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

export default async function serveCollegeRankings(request: CollegeRankingsRequest): Promise<CollegeRankingsResponse> {

    const pool = await databasePool;

    const innerQuery = squel.select().from("ai_data.schools")
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


    const query = pool.query(squel.select()
        .from(innerQuery, "data")
        .where('undergrad_tuition_in_state >= ? and undergrad_tuition_in_state <= ?', request.tuition.min * 1000, request.tuition.max * 1000)
        .where('median_sat >= ? and median_sat  <= ?', request.median_sat.min * 10, request.median_sat.max * 10)
        .where('total_students >= ? and total_students  <= ?', request.total_students.min  * 1000, request.total_students.max * 1000)
        .where('data.acceptance_rate >= ? and data.acceptance_rate  <= ?', request.acceptance_rate.min / 100, request.acceptance_rate.max / 100)
        .order(request.sort, request.reversed)
        .where(request.sort + ' is not null')
        .limit(25)
        .toParam())

    const limitQuery = pool.query(
        squel.select()
        .from(innerQuery, "data")
        .field(squel.rstr("max(undergrad_tuition_in_state)"), "max_tuition")
        .field(squel.rstr("min(undergrad_tuition_in_state)"), "min_tuition")
        .field(squel.rstr("max(median_sat)"), "max_sat")
        .field(squel.rstr("min(median_sat)"), "min_sat")
        .field(squel.rstr("max(acceptance_rate)"), "max_acceptance_rate")
        .field(squel.rstr("min(acceptance_rate)"), "min_acceptance_rate")
        .field(squel.rstr("max(total_students)"), "max_total_students")
        .field(squel.rstr("min(total_students)"), "min_total_students")
        .toParam())


    const queryResult = await query;
    const limitResult = await limitQuery;


    return {
        schools: queryResult.rows,
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
            }
        }
    }
}