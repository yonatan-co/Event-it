import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.status || 500;
  console.log(err);
  if (err.data) {
    return res.status(status).json({
      error: err.data[0],
    });
  }
  return res.status(status).json({
    error: err.message,
  });
};

export default errorHandler;
