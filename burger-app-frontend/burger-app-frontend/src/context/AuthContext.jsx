import { createContext, useContext, useState, useEffect } from "react";
import API from "../api"; // Import centralized Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    let isMounted = true; // Prevent memory leaks in async calls

    const checkAuth = async () => {
      try {
        const { data } = await API.get("/me"); // Uses API instance
        if (isMounted) setUser(data);
      } catch (error) {
        console.error("Auth check failed:", error);
        if (isMounted) setUser(null);
      }
    };

    checkAuth();

    return () => {
      isMounted = false; // Cleanup effect
    };
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      await API.post("/login", credentials);
      const { data } = await API.get("/me"); // Fetch user info after login
      setUser(data);
      return true; // Return true on success
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      setUser(null);
      return false; // Return false on failure
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await API.post("/logout");
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

const useAuth = () => useContext(AuthContext);

export default useAuth
