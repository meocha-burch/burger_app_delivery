import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "../api"; // Import Axios instance

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
  color: white;
`;

const RegisterForm = styled.form`
  background: #222;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #ffcc00;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background-color: #e6b800;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await API.post("/auth/register", formData); // 🔥 Adjust API route if needed
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <RegisterContainer>
      <h2>Register</h2>
      <RegisterForm onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Sign Up</Button>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default RegisterPage;
