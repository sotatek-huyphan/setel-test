import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Patch,
} from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { OrderService } from './service/order.service';

@Controller()
export class OrderController {
  private readonly _logger = new Logger(OrderController.name);

  constructor(private _orderService: OrderService) { }

  @Post('order')
  async createOrder(@Body() order: OrderDTO) {
    const rs = await this._orderService.createOrder(order);
    if (!rs) {
      throw new HttpException(
        { error: 'INTERNAL_ERROR' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return rs;
  }

  @Get('order/:id')
  async getOrder(@Param('id') id: string) {
    if (!id) {
      throw new HttpException({ error: 'BAD_REQUEST' }, HttpStatus.BAD_REQUEST);
    }
    const rs = await this._orderService.getOrder(id);
    if (!rs) {
      throw new HttpException({ error: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);
    }
    return rs;
  }

  @Get('orders')
  async listOrder() {
    return await this._orderService.listOrder();
  }

  @Patch('order/:id')
  async cancelOrder(@Param('id') id: string, @Body() order: OrderDTO) {
    if (!id) {
      throw new HttpException({ error: 'BAD_REQUEST' }, HttpStatus.BAD_REQUEST);
    }
    await this._orderService.cancelOrder(id);
  }
}
