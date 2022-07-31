import { ServerError } from "../../../api/src/types/error";

export interface Response {
  status: number;
  error?: ServerError;
}

export interface LoginResponse extends Response {
  token?: string;
  userId?: string;
}
