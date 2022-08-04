import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useSignup from "../hooks/useSignup";

function Signup() {
  // local signup states;
  const signup = useSignup();
  const nevigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    const { success, data } = await signup({
      email: email,
      username: username,
      password: password,
    });
    if (success) {
      nevigate("/login");
    }
  };

  return (
    <form className="signup" onSubmit={HandleSubmit}>
      <h3>Sign Up</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
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

export default Signup;
