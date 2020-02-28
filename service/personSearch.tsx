import databasePool from "../databasePool";
import { PersonSearchRequest, PersonSearchResponse } from "../schema";
import * as squel from "../squel";
import { PERSON_ENTITY_TYPE } from "./databasePerson";
import { extractIdentifiableFields, lookupAll } from "./entityDatabase";

export default async function serveAutocomplete(
  request: PersonSearchRequest
): Promise<PersonSearchResponse> {
  const pool = await databasePool;

  const query = pool.query(
    lookupAll(PERSON_ENTITY_TYPE)
      .join(
        "ai_data.person_aliases",
        undefined,
        "person_aliases.person_id = people.id"
      )
      .field(
        squel.rstr("max(similarity(?, person_aliases.alias))", request),
        "similarity"
      )
      .order("similarity", false)
      .inner()
      .group("people.id")
      .field("max(ai_people.slug)", "slug")
      .field("max(people.name)", "name")
      .limit(10)
      .toParam()
  );

  return {
    people: (await query).rows.map(extractIdentifiableFields)
  };
}
