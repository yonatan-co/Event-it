import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { User } from "../models/user.model";
import { ServerError } from "../types/error";
import { AutherizedRequest } from "../types/requests";
import { handle } from "../utils/error";

export default (req: AutherizedRequest, _: unknown, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error: ServerError = new Error("Not authenticated.");
      error.status = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    decodedToken = jwt.verify(token, "somesupersecretsecret") as JwtPayload;
    if (!decodedToken) {
      const error: ServerError = new Error("Not authenticated.");
      error.status = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    next();
  } catch (err: any) {
    handle(next, err);
  }
};
