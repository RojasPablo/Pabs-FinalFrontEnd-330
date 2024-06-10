import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await handleLogin({ email, password });
      setSuccess("Login successful!");
      setTimeout(() => {
        navigate("/workouts");
      }, 1000);
    } catch (error) {
      setError(error.message || "Failed to login");
    }
  };
  return (
    <form onSubmit={onSubmit}>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <h2>Login</h2>
      <div className="input-containers">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="input" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
