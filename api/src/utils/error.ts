import { NextFunction } from "express";
import { User } from "../models/user.model";
import { ServerError } from "../types/error";
import { AutherizedRequest } from "../types/requests";

export function handle(next: NextFunction, err: any): void {
  if (!err.status) {
    err.status = 500;
  }
  next(err);
}

export async function isAuthorized(
  req: AutherizedRequest
): Promise<ServerError | void> {
  // if (!req.userId) {
  //   const error: ServerError = new Error("you need to be logged in to do this");
  //   error.status = 401;
  //   return error;
  // }
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error: ServerError = new Error("Not authenticated.");
    error.status = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  const user = await User.findById(req.userId);

  if (!user) {
    const error: ServerError = new Error(
      "we have an error; please try to login again"
    );
    error.status = 401;
    throw error;
  }
  if (!token || !user.token) {
    const error: ServerError = new Error("you need to be logged in to do this");
    error.status = 401;
    return error;
  }
  if (user.token?.toString() !== token.toString()) {
    const error: ServerError = new Error(
      "we have an error; please try to login again"
    );
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
    return error;
  }
}
