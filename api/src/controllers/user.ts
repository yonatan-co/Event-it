import { User } from "../models/user.model";

import { handle, isAuthorized } from "../utils/error";

import { Response, NextFunction } from "express";

import { ServerError } from "../types/error";
import { AutherizedRequest } from "../types/requests";

export default {
  singleUser: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      isAuthorized(req);

      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        const err: ServerError = new Error("no user found");
        err.status = 404;
        throw err;
      }
      res.status(200).json({
        user: user,
      });
    } catch (err) {
      handle(next, err);
    }
  },
};
