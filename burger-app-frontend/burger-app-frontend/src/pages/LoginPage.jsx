import React, { useState, useContext } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Use useAuth, NOT AuthContext
import { AuthContext } from "../context/AuthContext"; // Adjust path if necessary

const LoginPage = () => {
  const { login } = useContext(AuthContext); // Get login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For handling errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Call login function from context
      // Redirect or show success message
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Error message */}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
