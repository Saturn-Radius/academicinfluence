import { differenceInMilliseconds } from "date-fns";
import { config } from "dotenv";
import { Pool } from "pg";
import { PostgresSelect } from "squel";
async function createDatabasePool() {
  config();
  const pool = new Pool();
  return pool;
}

export async function databaseQuery(queryConfig: PostgresSelect) {
  const pool = await createDatabasePool();

  const before = new Date();
  const result = await pool.query(queryConfig.toParam());
  const after = new Date();
  const time = differenceInMilliseconds(after, before);
  if (time > 1000) {
    console.log(queryConfig.toString(), time);
  }
  return result;
}
