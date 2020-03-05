import databasePool from "../databasePool";
import {
  disciplineBreakdownQuery,
  extractDisciplineBreakdown
} from "../influenceScore";
import { PersonPageRequest, PersonPageResponse } from "../schema";
import { extractPartialPerson, PERSON_ENTITY_TYPE } from "./databasePerson";
import { extractEntityFields, lookupBySlug } from "./entityDatabase";
import { SCHOOL_ENTITY_TYPE } from "./schoolDatabase";

export default async function servePersonPage(
  request: PersonPageRequest
): Promise<PersonPageResponse> {
  const pool = await databasePool;

  const personQuery = lookupBySlug(PERSON_ENTITY_TYPE, request.slug)
    .addDescribableFields(PERSON_ENTITY_TYPE)
    .addEntityFields(PERSON_ENTITY_TYPE)
    .field("birth_year")
    .field("death_year")

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
      ...extractPartialPerson(person),
      ...(await extractEntityFields(person)),
      birth_year: person.birth_year,
      death_year: person.death_year,
      links,
      schools: (await schoolQuery).rows,
      works: (await workQuery).rows,
      ...extractDisciplineBreakdown(await disciplineQuery)
    }
  };
}
