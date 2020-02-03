import { Dictionary } from "lodash";
import { DisciplineInfluenceData, PersonPageRequest, PersonPageResponse } from "../api";
import databasePool from "../databasePool";
import { influenceScoreQuery } from "../influenceScore";
import * as squel from "../squel";

export default async function servePersonPage(request: PersonPageRequest): Promise<PersonPageResponse> {

    const pool = await databasePool;

    const personQuery = pool.query(squel.select().from("editor.ai_people")
        .join("ai_data.people", undefined, "ai_data.people.id = editor.ai_people.id")
        .where("ai_people.slug = ?", request.slug)
        .field("people.name")
        .field("coalesce(nullif(ai_people.description, ''), people.description)", "description")
        .toParam())

    const influenceQuery = pool.query(influenceScoreQuery('person', 1900, 2020)
        .join("editor.ai_people", undefined, "editor.ai_people.id = scores.id")
        .where("editor.ai_people.slug = ?", request.slug)
        .left_join("editor.ai_disciplines", undefined, "ai_disciplines.id = scores.keyword")
        .field("ai_disciplines.name")
        .field("scores.keyword")
        .field("world_rank")
        .field("usa_rank")
        .order("influence", false)
        .where("scores.keyword is null or ai_disciplines.name is not null")
        .toParam())

    const schoolQuery = pool.query(squel.select().from("editor.ai_people")
        .join("ai_data.person_schools", undefined, "ai_data.person_schools.person_id = editor.ai_people.id")
        .where("ai_people.slug = ?", request.slug)
        .join("editor.ai_schools", undefined, "ai_schools.id = ai_data.person_schools.school_id")
        .join("ai_data.schools", undefined, "schools.id = ai_data.person_schools.school_id")
        .field("ai_schools.slug")
        .field("schools.name")
        .toParam())

    console.log(squel.select().from("editor.ai_people")
        .join("ai_data.person_schools", undefined, "ai_data.person_schools.person_id = editor.ai_people.id")
        .where("ai_people.slug = ?", request.slug)
        .join("editor.ai_schools", undefined, "ai_schools.id = ai_data.person_schools.school_id")
        .join("ai_data.schools", undefined, "schools.id = ai_data.person_schools.school_id")
        .field("ai_schools.slug")
        .field("schools.name")
        .toString())

    const person = (await personQuery).rows[0]

    let overall = null;
    const disciplines: Dictionary<DisciplineInfluenceData> = {}
    for (const row of (await influenceQuery).rows) {
        if (row.name === null) {
            overall = {
                influence: row.influence,
                world_rank: row.world_rank,
                usa_rank: row.usa_rank
            }
        } else {
            disciplines[row.name] = {
                influence: row.influence,
                world_rank: row.world_rank,
                usa_rank: row.usa_rank
            }
        }
    }
    return {
        person: {
            ...person,
            disciplines,
            overall,
            schools: (await schoolQuery).rows
        }
   }
}