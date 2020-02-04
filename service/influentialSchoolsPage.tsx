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
    .addInfluenceFields(SCHOOL_ENTITY_TYPE)
    .order("influence", false)
    .limit(30)
    .execute();

  const queryResult = await query;

  return {
    schools: queryResult.rows.map(row => ({
      ...extractPartialSchoolFields(row),
      overall: extractOverall(row)
    }))
  };
}
