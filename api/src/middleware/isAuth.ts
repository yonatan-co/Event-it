import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { User } from "../models/user.model";
import { AutherizedRequest } from "../types/requests";
import { handle } from "../utils/error";

export default (req: AutherizedRequest, _: unknown, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error: Error = new Error("Not authenticated.");
      error.name = "Unauthorized";
      throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    decodedToken = jwt.verify(token, "somesupersecretsecret") as JwtPayload;
    if (!decodedToken) {
      const error: Error = new Error("Not authenticated.");
      error.name = "Unauthorized";
      throw error;
    }
    req.userId = decodedToken.userId;
    next();
  } catch (err: any) {
    handle(next, err);
  }
};
