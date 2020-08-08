import { PaymentVerifyDTO } from './DTO/payment-verify.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {

  verify(param: PaymentVerifyDTO) {
    // return true;
    var random_boolean = Math.random() < 0.7;
    console.log('Payment result: ', random_boolean);
    return random_boolean;
  }
}
