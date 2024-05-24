import { db } from '../db';
import { customers } from '../schema';

(async () => {
  await db.delete(CustomerTable);

  const firstCustomer = await db.query.CustomerTable.findFirst();
  console.log(firstCustomer);
  process.exit();
})();
