import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Custom hook for authentication

const LoginContainer = styled.div`
  background-color: #1c1c1c;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const LoginBox = styled.div`
  background-color: #333;
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  text-align: center;
  color: #ffcc00;
  margin-bottom: 20px;
  font-size: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #444;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #ffcc00;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #ffcc00;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  color: black;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    background-color: #e6b800;
  }
`;

const SignUpLink = styled.p`
  text-align: center;
  color: #bbb;
  margin-top: 15px;

  a {
    color: #ffcc00;
    text-decoration: none;
    font-weight: bold;
  }
`;

const LoginPage = () => {
  const { login, signUp } = useAuth(); // Custom hook for login and sign-up
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/profile'); // Redirect to profile page after login
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/profile'); // Redirect to profile page after sign-up
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Welcome to Burger Quest</Title>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SubmitButton type="submit">Login</SubmitButton>
        </form>
        <SignUpLink>
          Don't have an account? <a href="#" onClick={handleSignUp}>Sign Up</a>
        </SignUpLink>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage;
