import { APIError } from './ErrorsList/AbstractError';

export function manageError<T extends APIError>(error: T) {
  throw error;
}
