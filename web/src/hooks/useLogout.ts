import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AuthActions } from "../redux/auth-slice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedState = useSelector((state: any) => state.isAuth);
  function logout() {
    console.log("let goo");
    // if (!loggedState.isAuth) {
    //   return navigate("/login");
    // }
    // localStorage.removeItem("token");
    // localStorage.setItem("isAuth", "false");
    dispatch(AuthActions.logout());
    return navigate("/login");
  }
  return logout;
};

export default useLogout;
