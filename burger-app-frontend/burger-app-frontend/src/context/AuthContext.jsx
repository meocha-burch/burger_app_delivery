import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../api"; 

// Create the AuthContext
export const AuthContext = createContext(); // ✅ Ensure this is exported

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const { data } = await API.get("/auth/me");
        if (isMounted) setUser(data);
      } catch (error) {
        if (isMounted) setUser(null);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials) => {
    try {
      await API.post("/auth/login", credentials);
      const { data } = await API.get("/auth/me");
      setUser(data);
      return true;
    } catch (error) {
      setUser(null);
      return false;
    }
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
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
export const useAuth = () => useContext(AuthContext); // ✅ Ensure this is exported

export default useAuth; // ✅ Default export
