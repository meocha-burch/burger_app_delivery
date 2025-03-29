import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Mock function for demo. Replace with actual login/signup logic.
const mockLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    if (email && password) {
      resolve({ user: { email } });
    } else {
      reject('Invalid credentials');
    }
  });
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);  // Named export for useAuth

export const AuthProvider = ({ children }) => {  // Named export for AuthProvider
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const result = await mockLogin(email, password);
    setUser(result.user);
  };

  const signUp = async (email, password) => {
    const result = await mockLogin(email, password); // Mock sign-up
    setUser(result.user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
