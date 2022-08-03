import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function LoginPage() {
  // local states;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin();

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const resData = await login({
        email: email,
        password: password,
      });
      if (resData) {
        navigate("../feed", { replace: true });
      }
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
