import { config } from "dotenv";
import { Pool } from "pg";

async function createDatabasePool() {
  config();
  const pool = new Pool();
  return pool;
}
export default createDatabasePool();
