import { useNavigate } from "react-router-dom";

import useSignup from "../hooks/useSignup";

import { useState } from "react";

export function SignupForm() {
  // local signup states;
  const signup = useSignup();
  const nevigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    userName: "",
    password: "",
  });

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    const { success, data } = await signup({
      email: state.email,
      username: state.userName,
      password: state.password,
    });

    if (success) {
      nevigate("/login");
    }
  };

  const HandleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="signup" onSubmit={HandleSubmit}>
      <h3>Sign Up</h3>

      <label>Email address:</label>
      <input
        type="email"
        name="email"
        onChange={(e) => HandleChange(e)}
        value={state.email}
      />
      <label>User name:</label>
      <input
        type="text"
        name="userName"
        onChange={(e) => HandleChange(e)}
        value={state.userName}
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
  );
}

export default SignupForm;
