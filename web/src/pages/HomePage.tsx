import * as React from "react";
import { useState } from "react";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <form onSubmit={submitHandler} className="signup">
      <div className="form_control">
        <label>email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>username</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit"> go</button>
      </div>
    </form>
  );
};

export default HomePage;
