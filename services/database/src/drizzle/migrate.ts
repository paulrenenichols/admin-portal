import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

console.log(process.env.DATABASE_URL);

const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });
const db = drizzle(migrationClient);

async function main() {
  await migrate(db, { migrationsFolder: 'drizzle/migrations' });
  await migrationClient.end();
}

main();
