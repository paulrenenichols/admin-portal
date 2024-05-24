import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString
});

export const db = drizzle(pool, { schema });
