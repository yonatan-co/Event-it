import { useState } from "react";
// import { length, required, email } from "../utils/validator";

import useSignup from "../hooks/useSignup";

const Signup = () => {
  // local signup states;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(email);
    useSignup({
      email: email,
      username: username,
      password: password,
    });
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
};

export default Signup;
