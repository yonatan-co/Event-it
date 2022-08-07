import { useState } from "react";

import { useNavigate } from "react-router-dom";

import useLogin from "../hooks/useLogin";

export function LoginForm() {
  // local states;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    const success = await login({
      email: email,
      password: password,
    });

    if (success) {
      navigate("/feed");
    }
  };

  return (
    <div className="login-page">
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
    </div>
  );
}

export default LoginForm;
