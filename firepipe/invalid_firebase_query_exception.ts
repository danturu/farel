import { BaseException } from './base_exception'

export class InvalidFirebaseQueryException extends BaseException {
  constructor(context: any, value: any) {
    super(`Invalid firebase query fiven '${value}' for context' ${context}'`);
  }
}
