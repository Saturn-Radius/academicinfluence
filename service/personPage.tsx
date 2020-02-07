import databasePool from "../databasePool";
import {
  disciplineBreakdownQuery,
  extractDisciplineBreakdown
} from "../influenceScore";
import { PersonPageRequest, PersonPageResponse } from "../schema";
import * as squel from "../squel";
import { PERSON_ENTITY_TYPE } from "./databasePerson";
import { extractDescribableFields, lookupBySlug } from "./entityDatabase";
import { SCHOOL_ENTITY_TYPE } from "./schoolDatabase";

export default async function servePersonPage(
  request: PersonPageRequest
): Promise<PersonPageResponse> {
  const pool = await databasePool;

  const personQuery = lookupBySlug(PERSON_ENTITY_TYPE, request.slug)
    .addDescribableFields(PERSON_ENTITY_TYPE)
    .field("birth_year")
    .overrideableField(PERSON_ENTITY_TYPE, "meta_description", undefined, "description")
    .field("death_year")
    .field(squel.str("case when (image_url = '') then (? || image) else (image_url) END", "/api/wmcimage/"), "image_url")
    .field(
      squel.str("case when image_url = ''then ? || image else image_source_url end", "https://commons.wikimedia.org/wiki/File:"),
      "image_source_url"
    )
    .field("wikipedia_title")
    .field("website")
    .execute();

  const disciplineQuery = disciplineBreakdownQuery(
    PERSON_ENTITY_TYPE,
    request.slug
  );

  const schoolQuery = lookupBySlug(PERSON_ENTITY_TYPE, request.slug)
    .join(
      "ai_data.person_schools",
      undefined,
      "ai_data.person_schools.person_id = editor.ai_people.id"
    )
    .followLink(SCHOOL_ENTITY_TYPE, "person_schools.school_id")
    .addIdentifiableFields(SCHOOL_ENTITY_TYPE)
    .execute();

  const workQuery = lookupBySlug(PERSON_ENTITY_TYPE, request.slug)
    .join(
      "ai_data.person_works",
      undefined,
      "ai_data.person_works.author_id = editor.ai_people.id"
    )
    .field("person_works.label")
    .order("person_works.influence", false)
    .execute();

  const person = (await personQuery).rows[0];

  const links = [];
  if (person.wikipedia_title) {
    links.push(
      "https://en.wikipedia.org/wiki/" +
        person.wikipedia_title.replace(/ /g, "_")
    );
  }
  if (person.website) {
    links.push(person.website);
  }
  return {
    person: {
      ...extractDescribableFields(person),
      meta_description: person.meta_description,
      birth_year: person.birth_year,
      death_year: person.death_year,
      image_url: person.image_url,
      image_source_url: person.image_source_url,
      links,
      schools: (await schoolQuery).rows,
      works: (await workQuery).rows,
      ...extractDisciplineBreakdown(await disciplineQuery)
    }
  };
}
