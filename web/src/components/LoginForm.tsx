import { useState } from "react";

import { useNavigate } from "react-router-dom";

import useLogin from "../hooks/useLogin";

export function LoginForm() {
  // local states;
  const navigate = useNavigate();
  const login = useLogin();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    const success = await login({
      email: state.email,
      password: state.password,
    });

    if (success) {
      navigate("/feed");
    }
  };

  const HandleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form className="login" onSubmit={HandleSubmit}>
        <h3>Login</h3>

        <label>Email address:</label>
        <input
          type="email"
          name="email"
          onChange={(e) => HandleChange(e)}
          value={state.email}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={(e) => HandleChange(e)}
          value={state.password}
        />

        <button>Sign up</button>
      </form>
    </>
  );
}

export default LoginForm;
