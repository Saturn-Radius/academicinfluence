import { Dictionary } from "lodash";
import databasePool from "../databasePool";
import { influenceScoreQuery } from "../influenceScore";
import { DisciplineInfluenceData, PersonPageRequest, PersonPageResponse } from "../schema";
import * as squel from "../squel";

export default async function servePersonPage(request: PersonPageRequest): Promise<PersonPageResponse> {

    const pool = await databasePool;

    const personQuery = pool.query(squel.select().from("editor.ai_people")
        .join("ai_data.people", undefined, "ai_data.people.id = editor.ai_people.id")
        .where("ai_people.slug = ?", request.slug)
        .field("people.name")
        .field("ai_people.slug")
        .field("coalesce(nullif(ai_people.description, ''), people.description)", "description")
        .field("birth_year")
        .field("death_year")
        .field(squel.str("? || image", "/api/wmcimage/"), "image_url")
        .field(squel.str("? || image", "https://commons.wikimedia.org/wiki/File:"), "image_source_url")
        .field("wikipedia_title")
        .field("website")
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


    const workQuery = pool.query(squel.select().from("editor.ai_people")
        .join("ai_data.person_works", undefined, "ai_data.person_works.author_id = editor.ai_people.id")
        .where("ai_people.slug = ?", request.slug)
        .field("person_works.label")
        .order("person_works.influence", false)
        .toParam())

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
    const links = []
    if (person.wikipedia_title) {
        links.push("https://en.wikipedia.org/wiki/" + person.wikipedia_title.replace(/ /g, '_'))
    }
    if (person.website) {
        links.push(person.website)
    }
    return {
        person: {
            birth_year: person.birth_year,
            death_year: person.death_year,
            image_url: person.image_url,
            image_source_url: person.image_source_url,
            name: person.name,
            slug: person.slug,
            description: person.description,
            disciplines,
            overall: overall as DisciplineInfluenceData,
            links,
            schools: (await schoolQuery).rows,
            works: (await workQuery).rows
        }
   }
}