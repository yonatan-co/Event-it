import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AuthActions } from "../redux/isAuth";

const LoginPage = () => {
  // global states;
  const isAuth = useSelector((state: any) => state.isAuth);
  const dispatch = useDispatch();

  // local states;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          dispatch(AuthActions.login());
        }
        return res.json();
      })
      .then((resData) => {})
      .catch((err) => console.log(err));
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
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
};

export default LoginPage;
