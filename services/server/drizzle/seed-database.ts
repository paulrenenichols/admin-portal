import 'dotenv/config';
import { db } from './db';
import fs from 'node:fs';
import { parse } from 'csv-parse';
import { CustomerTable } from './schema';

const __dirname = new URL('.', import.meta.url).pathname;

const processFile = async () => {
  const records = [];
  const parser = fs.createReadStream(`${__dirname}/../csv/customers.csv`).pipe(
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
  await Promise.all(recordsMinusHeader.map((record) => {
    const [userName, companyName, phoneNumber] = record;
    return db.insert(CustomerTable).values({userName, companyName, phoneNumber});
  }));

  const firstCustomer = await db.query.CustomerTable.findFirst();
  console.log(firstCustomer);
  process.exit();
})();
