import { validationResult, ValidationError, Result } from "express-validator";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model";

import { ServerError } from "../types/error";
import { AuthRequest } from "../types/requests";
import { NextFunction, Response } from "express";

export default {
  signup: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error: ServerError = new Error("Validation failed");
        error.status = 422;
        error.data = errors.array();
        throw error;
      }

      const emailInUse = await User.findOne({ email: req.body.email });
      if (emailInUse) {
        const error: ServerError = new Error(
          "user with this meail alredy exit"
        );
        error.status = 422;
        throw error;
      }

      const hashedPw = await hash(req.body.password, 12);

      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPw,
        phoneNum: req.body.phoneNum,
      });
      const result = await user.save();
      return res.status(201).json({
        user: result,
      });
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  },
  login: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const email = req.body.email;
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        const error: ServerError = new Error("no user with this email found!");
        error.status = 401;
        throw error;
      }

      const correct = await compare(req.body.password, user.password);
      if (!correct) {
        const error: ServerError = new Error(
          "either your email or password is incorrrect"
        );
        error.status = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id.toString(),
        },
        "somesupersecretsecret",
        { expiresIn: "1h" }
      );
      res.status(202).json({
        token: token,
        userId: user.id.toString(),
      });
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  },
};
