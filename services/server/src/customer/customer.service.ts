import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../database/db';
import { customers } from '../database/schema';

@Injectable()
export class CustomerService {
  getCustomerHello(): string {
    return 'Hello Customer!';
  }

  getAllCustomers(): any {
    return db.query.customers.findMany();
  }

  deleteCustomer(id: string): any {
    return db.delete(customers).where(eq(customers.id, id));
  }
}
