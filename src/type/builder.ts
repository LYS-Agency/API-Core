export type Builder = {
    name: string,
    path: string,
    request: RequestType,
    middlewares: Array<MiddlewaresFunction>,
    dataTransformers: Array<DataTransformersFunction>
}


/**
 * Middleware function type.
 * @param req - The request object.
 * @param res - The response object.
 * @throws {APIError} - Throws ApiError if an error occurs.
 */

type MiddlewaresFunction = (req: Request, res: Response) => void

type DataTransformersFunction<T> = (req: Request, res: Response, data: object | Array<any>, ...args: any[]) => T

type RequestType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
