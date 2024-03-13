export class APIError implements Error {
    code: number;
    errorType: string;

    constructor(name: string, message: string, code: number, errorType: string) {
        super(message)
        this.name = name
        this.code = code
        this.errorType = errorType
    }
}