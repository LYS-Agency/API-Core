export type Builder = {
    name: string,
    path: string,
    request: RequestType,
    middlewares: Array<(req: Request, res: Response) => void>
}


/**
 * Middleware function type.
 * @param req - The request object.
 * @param res - The response object.
 * @throws {MiddlewaresError} - Throws MiddlewaresError if an error occurs.
 */

type MiddlewaresFunction = (req: Request, res: Response) => void

type RequestType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
