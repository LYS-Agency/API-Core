export class RuntimeError extends APIError {
    constructor(message: string) {
        super('RuntimeError', message, 521, "BuildError");
    }
}