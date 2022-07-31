import { IResponse } from "../types/response";

export const errorCheck = (res: IResponse) => {
  if (res.status === 422) {
    if (res.error?.data) {
      return new Error(res.error.data[0]);
    }
    return new Error(res.error?.message);
  }
  if (res.status === 401) {
    return new Error("the email or password are incorrect");
  }
  if (!res.ok) {
    console.log(res.status);
    return new Error(res.error?.message);
  }
};
