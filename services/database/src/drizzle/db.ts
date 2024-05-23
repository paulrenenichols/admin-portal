import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from 'postgres';

const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:example@localhost:5432/admin-portal';

const client = postgres(dbUrl);
export const db = drizzle(client, { schema, logger: true });
