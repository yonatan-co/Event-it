import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { handle, isAuthorized, allowedToModify } from "../utils/error";

import { User } from "../models/user.model";
import { EventToUser } from "../models/eventToUser.model";

import { AutherizedRequest } from "../types/requests";

export default {
  singleUser: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const notAuthorized = await isAuthorized(req);
      if (notAuthorized) {
        throw notAuthorized;
      }

      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        const error: Error = new Error("no user found");
        throw error;
      }
      res.status(200).json({
        user: user,
      });
    } catch (err: any) {
      handle(next, err);
    }
  },
  updateEvent: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const notAuthorized = await isAuthorized(req);
      if (notAuthorized) {
        throw notAuthorized;
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error: Error = new Error("Validation failed");
        error.name = "ValidationFailed";
        throw error;
      }

      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        const error: Error = new Error("no event found");
        error.name = "NotFound";
        throw error;
      }

      const error = allowedToModify(req, user);
      if (error) {
        throw error;
      }

      user.username = req.body.username;
      const updateduser = await user.save();
      res.status(200).json({
        message: "event updated",
        user: updateduser,
      });
    } catch (err: any) {
      handle(next, err);
    }
  },
  deleteUser: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const notAuthorized = await isAuthorized(req);
    if (notAuthorized) {
      throw notAuthorized;
    }

    const userId = req.params.userId;
    try {
      const user = await User.findById(userId);

      if (!user) {
        const error: Error = new Error("no event found");
        error.name = "NotFound";
        throw error;
      }

      const error = allowedToModify(req, user);
      if (error) {
        throw error;
      }

      await user.delete();
      await EventToUser.deleteMany({ eventId: userId });
      res.status(200).json({
        message: `user #${userId} deleted`,
      });
    } catch (err: any) {
      handle(next, err);
    }
  },
};
