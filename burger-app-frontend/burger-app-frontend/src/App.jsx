import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import SecondaryNavbar from "./components/SecondaryNavbar";
import TextNavbar from "./components/TextNavbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import Profile from "./pages/Profile";
import CheckoutPage from "./pages/CheckoutForm"; // ✅ Import new checkout page
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// ✅ Load Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Function to add items to cart
  const addToCart = (item) => {
    setCartItems((prevCart) => [...prevCart, item]);
  };

  // ✅ Function to remove items from cart
  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <AuthProvider>
      <Router>
        {/* Primary Navbar */}
        <Navbar cartCount={cartItems.length} />

        {/* Secondary Navbar (Green) */}
        <SecondaryNavbar />

        {/* Third Navbar (Text Only) */}
        <TextNavbar />

        {/* ✅ Wrap CheckoutPage inside Stripe Elements */}
        <Elements stripe={stripePromise}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/deals" element={<h1>Deals Page</h1>} />
            <Route path="/about" element={<h1>About Us</h1>} />

            {/* Protected Routes */}
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><CheckoutPage cartItems={cartItems} /></PrivateRoute>} />
          </Routes>
        </Elements>

        {/* Footer */}
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
