import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "../db";

const __dirname = new URL('.', import.meta.url).pathname;
console.log(`migrate ${__dirname}`);

migrate(db, { migrationsFolder: `${__dirname}../migrations` })
  .then(() => {
    console.log("Migrations complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migrations failed!", err);
    process.exit(1);
  });
