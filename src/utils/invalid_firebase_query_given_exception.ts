import { BaseException } from '../base_exception'

export class InvalidFirebaseQueryGivenException extends BaseException {
  constructor(context: any, value: any) {
    super(`Invalid firebase query fiven '${JSON.stringify(value)}' for context' ${context}'`);
  }
}
