import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(
    @Query('userId') userId: string,
    @Query('type') type?: 'material' | 'transaction',
    @Query('status') status?: string,
  ) {
    return this.ordersService.findAll({ 
      userId: +userId, 
      type, 
      status 
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Get('transactions/:userId')
  getTransactions(@Param('userId') userId: string) {
    return this.ordersService.getTransactions(+userId);
  }
}
