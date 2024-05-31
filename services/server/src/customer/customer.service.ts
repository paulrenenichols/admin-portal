import { Injectable } from '@nestjs/common';
import { eq, ilike, or } from 'drizzle-orm';
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

  searchCustomers(searchText: string): any {
    return db
      .select()
      .from(customers)
      .where(
        or(
          ilike(customers.phone, `%${searchText}%`),
          ilike(customers.user, `%${searchText}%`),
          ilike(customers.company, `%${searchText}%`),
        ),
      );
  }

  async getCustomer(id: string): Promise<any> {
    const customerArray = await db.query.customers.findMany({
      where: eq(customers.id, id),
    });
    return customerArray[0];
  }

  deleteCustomer(id: string): any {
    return db.delete(customers).where(eq(customers.id, id));
  }
}
