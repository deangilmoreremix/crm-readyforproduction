import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../shared/schema";
import inMemoryDb from "./in-memory-db";

let db;

if (process.env.USE_IN_MEMORY_DB === "true") {
  db = inMemoryDb;
} else {
  const client = postgres(process.env.DATABASE_URL!, { max: 1 });
  db = drizzle(client, { schema });
}

export { db };