import databasePool from "../databasePool";
import { CountriesRequest, CountriesResponse } from "../schema";
import * as squel from "../squel";

export default async function serveDisciplines(
  request: CountriesRequest
): Promise<CountriesResponse> {
  const pool = await databasePool;

  const countriesQuery = pool.query(
    squel
      .select()
      .from("ai_data.schools")
      .field("country")
      .group("country")
      .order("country")
      .where("country is not null")
      .toParam()
  );

  return (await countriesQuery).rows.map(row => ({
    name: row.country
  }));
}
