import { databaseQuery } from "../databasePool";
import {
  LocationAutocompleteRequest,
  LocationAutocompleteResponse
} from "../schema";
import * as squel from "../squel";

export default async function serveAutocomplete(
  request: LocationAutocompleteRequest
): Promise<LocationAutocompleteResponse> {
  const query = await databaseQuery(
    squel
      .select()
      .from("ai_data.cities")
      .where(
        "name ilike ?",
        request.replace("%", "%%").replace("_", "__") + "%"
      )
      .field("name")
      .field("st_x(location::geometry)", "long")
      .field("st_y(location::geometry)", "lat")
      .limit(20)
      .order("population", true)
  );

  return {
    cities: query.rows.map(row => ({
      ...row
    }))
  };
}
