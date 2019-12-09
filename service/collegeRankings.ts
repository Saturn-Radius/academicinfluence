import * as squel from "../squel"
import { CollegeRankingsRequest, CollegeRankingsResponse } from "../api";
import databasePool from "../databasePool"

function calculateScore(start_year: number, stop_year: number, discipline: string | null) {
    const start = squel.str("GREATEST(ai_data.scores.year_start,?)::float - ai_data.scores.year_start", start_year);
    const end = squel.str("LEAST(scores.year_end + 1,?)::float - ai_data.scores.year_start", stop_year); 

    const a_term = squel.str("scores.a * (? - ?)", end, start);
    const b_term = squel.str("scores.b * (power(?, 2) - power(?,2)) / 2", end, start);
    const c_term = squel.str("scores.c * (power(?, 3) - power(?,3)) / 3", end, start);

    const expression = squel.str("? + ? + ?", a_term, b_term, c_term)

    const adapted = squel.str("ln(? + exp(1.0)) / 15.0", expression)

    const query = squel.select()
        .from(squel.rstr("ai_data.scores"))
        .field(adapted)

    if (discipline) {
        query.where("keyword = ?", discipline)
    } else {
        query.where("keyword is null")
    }

    return query
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
        .field("desirability")
        .field("location")
        .field(squel.rstr("admissions::float / applications::float"), "acceptance_rate")
        .field(squel.rstr("undergraduate_students + graduate_students"), "total_students")
        .field(calculateScore(request.years.min, request.years.max, request.discipline || null).where("scores.id = schools.id"), "influence_score")
        .field("logo_url")

    const query = squel.select()
        .from(innerQuery, "data")
        .where('undergrad_tuition_in_state >= ? and undergrad_tuition_in_state <= ?', request.tuition.min * 1000, request.tuition.max * 1000)
        .where('median_sat >= ? and median_sat  <= ?', request.median_sat.min * 10, request.median_sat.max * 10)
        .where('total_students >= ? and total_students  <= ?', request.total_students.min  * 1000, request.total_students.max * 1000)
        .where('data.acceptance_rate >= ? and data.acceptance_rate  <= ?', request.acceptance_rate.min / 100, request.acceptance_rate.max / 100)
        .order(request.sort, request.reversed)
        .where(request.sort + ' is not null')
        .limit(25)
    if (request.states !== null) {
        query.where('state in ?', request.states)
    }
    if (request.location !== null) {
        const encoded = `SRID=4326;POINT(${request.location.long} ${request.location.lat})`
        query.where('location <-> ? >= ?', encoded, request.location.distance.min * 1609.34)
        query.where('location <-> ? <= ?', encoded, request.location.distance.max * 1609.34)
    }

    console.log(query.toString())

    const sentQuery = pool.query(query
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


    const queryResult = await sentQuery;
    const limitResult = await limitQuery;


    return {
        schools: queryResult.rows.map(row => ({
            ...row,
            image_url: row.ipeds_id && 'https://academicinfluence.com/images/schools/logos/' + row.ipeds_id
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
    }
}