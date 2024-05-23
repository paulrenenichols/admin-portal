import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:example@localhost:5432/admin-portal';

console.log(`migrate ${dbUrl}`);

const migrationClient = postgres(dbUrl, { max: 1 });
const db = drizzle(migrationClient);

async function main() {
  await migrate(db, { migrationsFolder: 'src/drizzle/migrations' });
  await migrationClient.end();
}

main();
