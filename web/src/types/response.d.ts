import { ServerError } from "../../../api/src/types/error";

export interface IResponse extends Response {
  error?: ServerError;
}

export interface LoginResponse extends IResponse {
  token?: string;
  userId?: string;
}
