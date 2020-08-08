import { PaymentService } from './payment.service';
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { PaymentVerifyDTO } from './DTO/payment-verify.dto';

@Controller('payment')
export class PaymentController {
  constructor(private _paymentService: PaymentService) {}

  @MessagePattern( {cmd : 'payment'} )
  payment(param: PaymentVerifyDTO) {
    const verified = this._paymentService.verify(param);
    const result = { isSuccess: verified };
    console.log(result);
    return result;
  }
}
