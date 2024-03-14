export function manageError<T extends APIError>(message: string) {
    throw new T(message)
}