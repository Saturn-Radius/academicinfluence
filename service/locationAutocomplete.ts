import {
  LocationAutocompleteRequest,
  LocationAutocompleteResponse
} from "../api";
import databasePool from "../databasePool";
import * as squel from "../squel";

export default async function serveAutocomplete(
  request: LocationAutocompleteRequest
): Promise<LocationAutocompleteResponse> {
  const pool = await databasePool;

  const query = await pool.query(
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
      .toParam()
  );

  return {
    cities: query.rows.map(row => ({
      ...row
    }))
  };
}
