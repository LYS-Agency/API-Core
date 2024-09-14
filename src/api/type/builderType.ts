import { Model } from 'mongoose';

export type ModelFunctions_<Keys extends keyof Model<any>> =
  Keys extends keyof any
    ? Model<any>[Keys] extends (...args: any[]) => any
      ? Keys
      : never
    : never;

/**
 * It's returning the current pure object
 * Likre all the Model content and not the User content or Trainers...
 */
export type ModelFunctions = ModelFunctions_<keyof Model<any>>;

/**
 * // type TMP4<K extends string> = K extends `$${infer R}` ? R : never;
 * // type TMP5 = TMP4<ModelFunctions>;
 *
 * Return all the sring with a $ and delete it
 */

type TMP4<K extends string> = K extends `$${any}` ? never : K;
export type ModelFunctionList = TMP4<ModelFunctions> | 'none';

export type Builder = {
  name: string;
  path: string;
  request: RequestType;
  schema: Model<any>;
  params?: {
    key: string;
    getter: 'query' | 'body' | ((req: any, res: any) => Promise<string>);
    mandatory: boolean;
  }[];
  middlewares?: Array<MiddlewaresFunction>;
  dataTransformers?: Array<DataTransformersFunction>;
  cachedData?: boolean;
  protected?: boolean;
  codeSpace?: codeSpace;
  functionPropeties: {
    functionDB: ModelFunctionList | 'none';
    request: string;
  };
  pagination?: {
    limit: {
      getter: 'query' | 'body';
    };
    offset: {
      getter: 'query' | 'body';
    };
  };
};

export type BuilderParams = Builder['params'];

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
