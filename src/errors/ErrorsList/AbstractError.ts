export class APIError extends Error {
  code: number;
  errorType: string;

  constructor(name: string, message: string, code: number, errorType: string) {
    super(message);
    this.name = name;
    this.code = code;
    this.errorType = errorType;
  }
}
