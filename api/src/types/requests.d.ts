import { Request } from "express";

export interface AuthRequest extends Request {
  email: string;
  username?: string;
  password: string;
  phoneNum?: string;
  profilePictureUrl?: string;
}
