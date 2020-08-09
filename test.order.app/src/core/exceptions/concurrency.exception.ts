import { HttpStatus, HttpException } from "@nestjs/common";

export class ConcurrencyException extends HttpException {
  constructor() {
    super('Conflict', HttpStatus.CONFLICT);
  }
}
