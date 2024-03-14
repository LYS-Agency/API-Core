export function manageError<T extends APIError>(error : T, message: string) {
    throw new error(message)
}