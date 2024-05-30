import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  user: varchar('user', { length: 256 }),
  company: varchar('company', { length: 256 }),
  phone: varchar('phone', { length: 10 }),
});
