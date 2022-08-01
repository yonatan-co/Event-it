import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../redux/Auth";
import { errorCheck } from "../utils/error";

interface TokenState {
  isAuth: boolean;
  token: string;
}

const useEventsList = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const res = await fetch("http://localhost:8080/feed/events", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const error = errorCheck(res);
    if (error) {
      throw error;
    }
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export default useEventsList;
