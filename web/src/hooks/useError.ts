import { Response } from "../types/response";

const useError = (response: Response): Error | boolean => {
  if (response.status === 422) {
    throw new Error("validation failed");
  }
  if (response.status !== 200 || 201) {
    throw new Error(response.error?.message);
  }
  return false;
};

export default useError;
