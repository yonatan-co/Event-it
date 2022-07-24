import { NextFunction } from "express";
import { ServerError } from "../types/error";
import { AutherizedRequest } from "../types/requests";

export function handle(next: any, err: any): void {
  if (!err.status) {
    err.status = 500;
  }
  next(err);
}

export function isAuthorized(req: AutherizedRequest): ServerError | void {
  if (!req.userId) {
    const error: ServerError = new Error("you need to be logged in to do this");
    error.status = 401;
    throw error;
  }
}

export function allowedToModify(
  req: AutherizedRequest,
  target: any
): ServerError | void {
  if (req.userId !== target.creator._id.toString()) {
    const error: ServerError = new Error("you cant modify other users events");
    error.status = 403;
    throw error;
  }
}
