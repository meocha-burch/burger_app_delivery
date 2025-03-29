import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../api"; // Ensure API is correctly configured with baseURL

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to check authentication status
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        credentials: "include", // Make sure cookies are sent
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is included
        },
      });
  
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };
  

  useEffect(() => {
    fetchUser(); // Call once on mount
  }, []);

  // Login Function
  const login = async (credentials) => {
    try {
      const { data } = await API.post("/auth/login", credentials, { withCredentials: true });
      setUser(data);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setUser(null);
      return false;
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await API.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem("token"); // Ensure token is cleared
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Prop validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
