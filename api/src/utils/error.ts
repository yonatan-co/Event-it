import { NextFunction } from "express";
import { User } from "../models/user.model";
import { AutherizedRequest } from "../types/requests";

export function handle(next: NextFunction, err: Error): void {
  next(err);
}

export async function isAuthorized(
  req: AutherizedRequest
): Promise<Error | void> {
  // if (!req.userId) {
  //   const error: Error = new Error("you need to be logged in to do this");
  //   error.name = "Unauthorized";;
  //   return error;
  // }
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error: Error = new Error("Not authenticated.");
    error.name = "Unauthorized";
    throw error;
  }
  const splited = authHeader.split(" ");
  const token = splited.length > 0 ? splited[1] : undefined;
  const user = await User.findById(req.userId);

  if (!user) {
    const error: Error = new Error(
      "we have an error; please try to login again"
    );
    error.name = "Unauthorized";
    throw error;
  }
  if (!token || !user.token) {
    const error: Error = new Error("you need to be logged in to do this");
    error.name = "Unauthorized";
    return error;
  }
  if (user.token?.toString() !== token.toString()) {
    const error: Error = new Error(
      "we have an error; please try to login again"
    );
    error.name = "Unauthorized";
    throw error;
  }
}

export function allowedToModify(
  req: AutherizedRequest,
  target: any
): Error | void {
  if (req.userId !== target.creator._id.toString()) {
    const error: Error = new Error("you cant modify other users events");
    error.name = "Unauthorized";
    return error;
  }
}
