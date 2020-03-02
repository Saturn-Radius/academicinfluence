import { Dictionary } from "lodash";
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
        squel.rstr("similarity(?, person_aliases.alias)", request),
        "similarity"
      )
      .order("similarity", false)
      .inner()
      .field("ai_people.slug", "slug")
      .field("people.name", "name")
      .where("alias % ?", request)
      .limit(10)
      .toParam()
  );

  const seen: Dictionary<boolean> = {};
  const people = [];
  for (const row of (await query).rows) {
    if (!(row.id in seen)) {
      people.push(extractIdentifiableFields(row));
      seen[row.id] = true;
    }
  }

  return {
    people
  };
}
