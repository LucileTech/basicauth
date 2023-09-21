import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      console.log("data", res.data);
      if (res.data) {
        console.log("token", res.data);
        navigate("/");
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Auth-form">
      <label>Email address</label>
      <input
        type="email"
        placeholder="Enter email"
        name="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        name="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}

export default Login;
