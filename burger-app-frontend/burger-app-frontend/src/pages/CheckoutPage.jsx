import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"; // Import Elements
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; // Import CardElement and hooks
import PropTypes from "prop-types";

// Load Stripe outside the component to avoid recreating the instance on each render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutContainer = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
`;

const CheckoutTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffcc00;
`;

const CheckoutButton = styled.button`
  background-color: #ffcc00;
  color: black;
  border: none;
  padding: 12px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;

  &:hover {
    background-color: #e6b800;
  }
`;

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };
  
  const stripe = useStripe(); // Get stripe instance from context
  const elements = useElements(); // Get elements instance from context

  const handlePayment = async (event) => {
    event.preventDefault(); // Prevent page refresh on form submit

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    console.log("Proceeding with payment...");

    // Create payment method with CardElement
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      return;
    }

    // Send paymentMethod to the backend for payment processing
    try {
      const response = await fetch("http://localhost:5000/api/checkout/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: totalAmount * 100 }), // Amount in cents
        cartItems: cartItems,
      });

      const { clientSecret } = await response.json();

      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (stripeError) {
        console.error("Payment error:", stripeError);
      } else {
        // Payment was successful, handle success
        navigate("/success"); // Redirect to a success page
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
    }
  };

  return (
    <CheckoutContainer>
      <CheckoutTitle>Complete Your Payment</CheckoutTitle>
      <h2>Total: ${totalAmount.toFixed(2)}</h2>

      <div>
        <h3>Cart Items:</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <CheckoutButton onClick={handlePayment}>Pay Now</CheckoutButton>
    </CheckoutContainer>
  );
};

// Prop validation for CheckoutPage
CheckoutPage.propTypes = {
  cartItems: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const CheckoutPageWithStripe = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutPage {...props} />
  </Elements>
);

export default CheckoutPageWithStripe;
