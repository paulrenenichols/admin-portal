import { db } from "../db";
import fs from "node:fs";
import { parse } from "csv-parse";
import { customers } from "../schema/schema";

const __dirname = new URL(".", import.meta.url).pathname;
console.log(`seed ${__dirname}`);

const processFile = async () => {
  const records = [];
  const parser = fs
    .createReadStream(`${__dirname}../../csv/customers.csv`)
    .pipe(
      parse({
        // CSV options if any
      }),
    );
  for await (const record of parser) {
    // Work with each record
    records.push(record);
  }
  return records;
};

(async () => {
  const records = await processFile();
  const recordsMinusHeader = records.slice(1);
  await Promise.all(
    recordsMinusHeader.map((record) => {
      const [user, company, phone] = record;
      return db.insert(customers).values({ user, company, phone });
    }),
  );

  const firstCustomer = await db.query.customers.findFirst();
  console.log(firstCustomer);
  process.exit();
})();
