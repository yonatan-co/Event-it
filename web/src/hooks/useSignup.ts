import { IResponse } from "../types/response";

interface IBody {
  email: string;
  username: string;
  password: string;
}

const useSignup = async (body: IBody) => {
  try {
    const res = (await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: body.email,
        username: body.username,
        password: body.password,
      }),
    })) as IResponse;
    if (res.status === 422) {
      throw new Error("validation failed");
    }
    if (!res.ok) {
      console.log(res.status);
      throw new Error(res.error?.message);
    }
    const resData = res.json();
  } catch (error) {
    console.log(error);
  }
};

export default useSignup;
