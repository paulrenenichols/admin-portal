import { Injectable } from '@nestjs/common';
import { db } from '../database/db';

@Injectable()
export class CustomerService {
  getCustomerHello(): string {
    return 'Hello Customer!';
  }

  getAllCustomers(): any {
    return db.query.customers.findMany();
  }
}
