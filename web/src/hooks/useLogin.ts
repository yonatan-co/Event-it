import { IResponse } from "../types/response";
import { errorCheck } from "../utils/error";
import { useDispatch } from "react-redux";
import { AuthActions } from "../redux/Auth";

interface IBody {
  email: string;
  password: string;
}

const useLogin = async (body: IBody) => {
  const dispatch = useDispatch();
  try {
    const res = (await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })) as IResponse;
    errorCheck(res);
    const resData = await res.json();
    dispatch(AuthActions.login(resData.token));
    return resData;
  } catch (err) {
    console.log(err);
  }
};

export default useLogin;
