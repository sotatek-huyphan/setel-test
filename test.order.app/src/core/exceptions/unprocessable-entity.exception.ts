import { HttpStatus, HttpException } from "@nestjs/common";

export class UnprocessableEntityException extends HttpException {
  constructor() {
    super('unprocessable entity', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
