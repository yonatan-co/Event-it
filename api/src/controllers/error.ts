import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.status || 500;
  console.log(err);
  return res.status(status).json({
    error: err.message,
  });
};

export default errorHandler;
