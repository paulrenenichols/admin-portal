import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  getCustomerHello(): string {
    return 'Hello Customer!';
  }
}
