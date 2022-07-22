import { Request } from "express";

export interface AutherizedRequest extends Request {
  userId?: string;
  token?: string;
}

export interface AuthRequest extends Request {
  userId?: string;
  token?: string;
  email: string;
  username?: string;
  password: string;
  phoneNum?: string;
  profilePictureUrl?: string;
}
