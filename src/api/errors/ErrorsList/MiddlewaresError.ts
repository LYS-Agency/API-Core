import { APIError } from './AbstractError';

export class MiddlewaresError extends APIError {
  /**
   * Middlewares Error.
   * @param message - The error you want to sen,d.
   * @param code - The code you want to send at the client.
   * @param errorType - It's just for the developer its not mandatory
   */
  constructor(message: string, code: number, errorType?: string) {
    super('MiddlewaresError', message, code, errorType);
  }
}
