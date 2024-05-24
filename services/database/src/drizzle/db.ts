import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:example@localhost:5432/admin-portal';

const pool = new Pool({
  connectionString
});

export const db = drizzle(pool, { schema });
