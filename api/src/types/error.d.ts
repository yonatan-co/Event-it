export interface ServerError extends Error {
  status?: number;
  data?: any[];
}

type ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => any;
