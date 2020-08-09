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
} from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { OrderService } from './service/order.service';

@Controller('order')
export class OrderController {
  private readonly _logger = new Logger(OrderController.name);

  constructor(private _orderService: OrderService) {}

  @Post()
  async createOrder(@Body() order: OrderDTO) {
    // return res.status(500);
    const rs = await this._orderService.createOrder(order);
    if (!rs) {
      throw new HttpException(
        { error: 'INTERNAL_ERROR' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
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

  @Put(':id')
  async cancelOrder(@Param('id') id: string, @Body() order: OrderDTO) {
    if (!id) {
      throw new HttpException({ error: 'BAD_REQUEST' }, HttpStatus.BAD_REQUEST);
    }
    this._orderService.cancelOrder(id);
  }
}
