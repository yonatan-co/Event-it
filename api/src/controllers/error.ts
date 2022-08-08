import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status: number;
  switch (err.name) {
    case "Unauthorized":
      status = 401;
      break;
    case "NotFound":
      status = 404;
      break;
    case "ValidationFailed":
      status = 422;
      break;
    default:
      status = 500;
      break;
  }
  console.log(err);
  return res.status(status).json({
    error: err.message,
  });
};

export default errorHandler;
