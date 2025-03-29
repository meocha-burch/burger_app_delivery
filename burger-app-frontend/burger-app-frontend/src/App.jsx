import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import CheckoutPageWithStripe from "./pages/CheckoutPage";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import TagLineBar from "./components/TagLineBar";
import TextNavbar from "./components/TextNavbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import OrderPage from "./pages/OrderPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Signup.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

console.log('Stripe loaded:', stripePromise);
console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const totalAmount = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const addToCart = (item) => {
    setCartItems((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Updated cartItems in localStorage:", cartItems); // ✅ Debugging log
  }, [cartItems]);

  // ✅ Debugging log to check cart data
  console.log("App.js cartItems state:", cartItems);

  return (
    <Router> {/* ✅ Router should wrap everything */}
      <AuthProvider> {/* ✅ AuthProvider inside Router to avoid context issues */}
        <Navbar cartCount={cartItems.length} />
        <TagLineBar />
        <TextNavbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} />} />
          <Route path="/order" element={<OrderPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
          {/* Combine the two CheckoutPage routes into one with Elements wrapping */}
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Elements stripe={stripePromise}>
                  <CheckoutPage cartItems={cartItems} totalAmount={totalAmount} />
                </Elements>
              </PrivateRoute>
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<h1>About Us</h1>} />
        </Routes>

        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
