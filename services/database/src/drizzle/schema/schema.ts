import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userName: varchar('user', { length: 256 }),
  companyName: varchar('company', { length: 256 }),
  phoneNumber: varchar('phone', { length: 10 }),
});
