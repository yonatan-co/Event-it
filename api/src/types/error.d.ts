import { ValidationError } from "express-validator";

type ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => any;
