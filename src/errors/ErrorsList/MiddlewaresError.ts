class MiddlewaresError extends APIError {
    constructor(message: string, code: number, errorType: string) {
        super("MiddlewaresError", message, code, errorType)
    }
} 