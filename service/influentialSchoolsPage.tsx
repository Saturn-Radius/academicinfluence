import databasePool from "../databasePool";
import {
  InfluentialSchoolsPageRequest,
  InfluentialSchoolsPageResponse
} from "../schema";
import { extractOverall, lookupAll } from "./entityDatabase";
import {
  addPartialSchoolFields,
  extractPartialSchoolFields,
  SCHOOL_ENTITY_TYPE
} from "./schoolDatabase";

export default async function serveInfluentialSchools(
  request: InfluentialSchoolsPageRequest
): Promise<InfluentialSchoolsPageResponse> {
  const pool = await databasePool;

  const query = lookupAll(SCHOOL_ENTITY_TYPE)
    .apply(addPartialSchoolFields)
    .addInfluenceFields(SCHOOL_ENTITY_TYPE, request.years, request.discipline)
    .order("influence", false)
    .limit(30);

  if (request.country !== null) {
    query.where("schools.country = ?", request.country);
  }

  console.log(query.inner().toString());
  const queryResult = await query.execute();

  return {
    schools: queryResult.rows.map(row => ({
      ...extractPartialSchoolFields(row),
      overall: extractOverall(row)
    }))
  };
}
