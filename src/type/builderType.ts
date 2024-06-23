export type Builder = {
  name: string;
  path: string;
  schema: string;
  functionDB: string;
  request: RequestType;
  params?: {
    key: string;
    getter: 'query' | 'body' | ((req: any, res: any) => Promise<string>);
  }[];
  middlewares?: Array<MiddlewaresFunction>;
  dataTransformers?: Array<DataTransformersFunction>;
  cachedData?: boolean;
  protected?: boolean;
  codeSpace?: codeSpace;
};

/**
 * Middleware function type.
 * @param req - The request object.
 * @param res - The response object.
 * @throws {APIError} - Throws ApiError if an error occurs.
 */

type MiddlewaresFunction = <ErrorT>(req: Request, res: Response) => void;

type DataTransformersFunction = <T>(
  req: Request,
  res: Response,
  data: object | Array<any>,
  ...args: any[]
) => T;

type RequestType = 'get' | 'post' | 'put' | 'patch' | 'delete';

type codeSpace = Array<mapCodeSpace>;

type CallbackCodeSpace<T> = (error?: Error, data?: T) => void;

type mapCodeSpace = {
  step: number;
  function: <T>(
    req: Request,
    res: Response,
    callback: CallbackCodeSpace<T>,
    ...args: any[]
  ) => void;
};

export type ActionKey = 'LOADER' | 'BUILDER';
