import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const CustomerTable = pgTable('customer', {
  id: uuid('id').primaryKey().defaultRandom(),
  userName: varchar('user_name', { length: 256 }),
  companyName: varchar('company_name', { length: 256 }),
  phoneNumber: varchar('phone_number', { length: 10 }),
});
