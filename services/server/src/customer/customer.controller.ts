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

  @Get('/search/:searchText')
  searchCustomers(@Param('searchText') searchText: string): any {
    return this.customerService.searchCustomers(searchText);
  }

  @Get('/:id')
  getCustomer(@Param('id') id: string): any {
    return this.customerService.getCustomer(id);
  }

  @Delete('/:id')
  deleteCustomer(@Param('id') id: string): any {
    return this.customerService.deleteCustomer(id);
  }
}
