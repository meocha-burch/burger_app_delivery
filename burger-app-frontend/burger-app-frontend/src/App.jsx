import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import SecondaryNavbar from "./components/SecondaryNavbar";
import TextNavbar from "./components/TextNavbar";  // ✅ Import Third Navbar
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";
import Profile from "./pages/Profile";
import Checkout from "./components/Checkout";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <AuthProvider>
      <Router>
        {/* Primary Navbar */}
        <Navbar />

        {/* Secondary Navbar (Green) */}
        <SecondaryNavbar />

        {/* Third Navbar (Text Only) */}
        <TextNavbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/deals" element={<h1>Deals Page</h1>} />
          <Route path="/about" element={<h1>About Us</h1>} />

          {/* Protected Routes */}
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><Checkout cartItems={cartItems} /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
