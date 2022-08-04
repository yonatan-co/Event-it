import { IResponse } from "../types/response";
import { useDispatch } from "react-redux";
import { AuthActions } from "../redux/auth-slice";
import { useState } from "react";

interface IBody {
  email: string;
  password: string;
}

const useLogin = () => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const login = async (body: IBody) => {
    try {
      const res = (await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })) as IResponse;
      const resData = await res.json();
      dispatch(AuthActions.login(resData.token));
      setSuccess(true);
      return success;
    } catch (err: any) {
      setSuccess(false);
      return success;
    }
  };
  return login;
};

export default useLogin;
