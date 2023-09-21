import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
function Register() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/register", {
        username,
        email,
        password,
      });
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Auth-form">
      <label>Name</label>
      <input
        type="name"
        placeholder="Enter email"
        name="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

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

export default Register;
