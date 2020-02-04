import databasePool from "../databasePool";
import { disciplineBreakdownQuery, extractDisciplineBreakdown } from "../influenceScore";
import { PersonPageRequest, PersonPageResponse } from "../schema";
import * as squel from "../squel";
import { PERSON_ENTITY_TYPE } from "./databasePerson";
import { addDescribableFields, addIdentifiableFields, extractDescribableFields, lookupBySlug } from "./entityDatabase";
import { SCHOOL_ENTITY_TYPE } from "./schoolDatabase";

export default async function servePersonPage(request: PersonPageRequest): Promise<PersonPageResponse> {

    const pool = await databasePool;

    const personQuery = pool.query(
        addDescribableFields(lookupBySlug(PERSON_ENTITY_TYPE, request.slug), PERSON_ENTITY_TYPE)
        .field("birth_year")
        .field("death_year")
        .field(squel.str("? || image", "/api/wmcimage/"), "image_url")
        .field(squel.str("? || image", "https://commons.wikimedia.org/wiki/File:"), "image_source_url")
        .field("wikipedia_title")
        .field("website")
        .toParam())

    const disciplineQuery = pool.query(
        disciplineBreakdownQuery(PERSON_ENTITY_TYPE, request.slug)
        .toParam())

    const schoolQuery = pool.query(
        addIdentifiableFields(lookupBySlug(PERSON_ENTITY_TYPE, request.slug)
        .join("ai_data.person_schools", undefined, "ai_data.person_schools.person_id = editor.ai_people.id")
        .join("editor.ai_schools", undefined, "ai_schools.id = ai_data.person_schools.school_id")
        .join("ai_data.schools", undefined, "schools.id = ai_data.person_schools.school_id"), SCHOOL_ENTITY_TYPE)
        .toParam())


    const workQuery = pool.query(
        lookupBySlug(PERSON_ENTITY_TYPE, request.slug)
        .join("ai_data.person_works", undefined, "ai_data.person_works.author_id = editor.ai_people.id")
        .field("person_works.label")
        .order("person_works.influence", false)
        .toParam())

    const person = (await personQuery).rows[0]
  
    const links = []
    if (person.wikipedia_title) {
        links.push("https://en.wikipedia.org/wiki/" + person.wikipedia_title.replace(/ /g, '_'))
    }
    if (person.website) {
        links.push(person.website)
    }
    return {
        person: {
            ...extractDescribableFields(person),
            birth_year: person.birth_year,
            death_year: person.death_year,
            image_url: person.image_url,
            image_source_url: person.image_source_url,
            links,
            schools: (await schoolQuery).rows,
            works: (await workQuery).rows,
            ...extractDisciplineBreakdown(await disciplineQuery)
        }
   }
}