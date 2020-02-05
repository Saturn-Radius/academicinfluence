import databasePool from "../databasePool";
import { SchoolSearchRequest, SchoolSearchResponse } from "../schema";
import * as squel from "../squel";
import { extractIdentifiableFields, lookupAll } from "./entityDatabase";
import { SCHOOL_ENTITY_TYPE } from "./schoolDatabase";

export default async function serveAutocomplete(
  request: SchoolSearchRequest
): Promise<SchoolSearchResponse> {
  const pool = await databasePool;

  const query = pool.query(lookupAll(SCHOOL_ENTITY_TYPE)
    .join("ai_data.school_aliases", undefined, "school_aliases.school_id = schools.id")
    .field(
      squel.rstr("max(similarity(?, school_aliases.alias))", request),
      "similarity"
    )
    .order("similarity", false)
    .inner()
    .group('schools.id')
    .field("max(ai_schools.slug)", "slug")
    .field("max(schools.name)", "name")
    .limit(10)
    .toParam())

  return {
    schools: (await query).rows.map(extractIdentifiableFields)
  };
}
