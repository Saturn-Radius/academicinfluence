import {
  InfluentialPeoplePageRequest,
  InfluentialPeoplePageResponse
} from "../schema";
import {
  addPartialPersonFields,
  extractPartialPerson,
  PERSON_ENTITY_TYPE
} from "./databasePerson";
import { lookupAll } from "./entityDatabase";

export default async function serveInfluentialPeople(
  request: InfluentialPeoplePageRequest
): Promise<InfluentialPeoplePageResponse> {
  console.log(request)
  const query = lookupAll(PERSON_ENTITY_TYPE)
    .apply(addPartialPersonFields)
    .addInfluenceFields(PERSON_ENTITY_TYPE, request.years, request.discipline)
    .order("influence", false)
    .limit(30);

  if (request.country !== null) {
    query.where("people.country = ?", request.country);
  }

  if (request.gender !== null) {
    query.where("people.gender = ?", request.gender);
  }

  console.log(query.inner().toString())
  const queryResult = await query.execute();

  return {
    people: queryResult.rows.map(row => ({
      ...extractPartialPerson(row)
    }))
  };
}
