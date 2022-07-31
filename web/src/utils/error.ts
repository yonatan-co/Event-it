import { IResponse } from "../types/response";

export const errorCheck = (res: IResponse) => {
  if (res.status === 422) {
    throw new Error("validation failed");
  }
  if (res.status === 401) {
    throw new Error("the email or password are incorrect");
  }
  if (!res.ok) {
    console.log(res.status);
    throw new Error(res.error?.message);
  }
};
