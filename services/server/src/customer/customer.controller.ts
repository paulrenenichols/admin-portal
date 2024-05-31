import { Controller, Get, Delete, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get('/hello')
  getHelloCustomer(): string {
    return this.customerService.getCustomerHello();
  }

  @Get()
  getAllCustomers(): string {
    return this.customerService.getAllCustomers();
  }

  @Delete('/:id')
  deleteCustomer(@Param('id') id: string): any {
    return this.customerService.deleteCustomer(id);
  }
}
