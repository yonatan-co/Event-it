import * as React from "react";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import useLogin from "../hooks/useLogin";

import { AuthActions } from "../redux/isAuth";

function LoginPage() {
  // global states;
  const isAuth = useSelector((state: any) => state.isAuth);
  const dispatch = useDispatch();

  // local states;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const resData = await useLogin({
        email: email,
        password: password,
      });
      dispatch(AuthActions.login(resData.userId));
      console.log(resData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="login" onSubmit={HandleSubmit}>
      <h3>Login</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button>Sign up</button>
    </form>
  );
}

export default LoginPage;
