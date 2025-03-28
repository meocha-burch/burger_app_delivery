import React, { useState } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";

// Styled Components
const CheckoutContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 28px;
  color: #ff6600;
`;

const CartSummary = styled.div`
  margin-top: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Total = styled.div`
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e65c00;
  }
`;

// Load Stripe outside the component to prevent re-initialization
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Payment Form Component
const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe is not loaded yet. Please wait.");
      return;
    }

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error(error);
        alert("Payment failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      // Send payment request to the server
      const response = await fetch("http://localhost:5000/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      // Confirm the payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        console.error(confirmError);
        alert("Payment failed. Please try again.");
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred during payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <Button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

// ✅ Define PropTypes for PaymentForm (outside function)
PaymentForm.propTypes = {
  amount: PropTypes.number.isRequired, // Ensure amount is a required number
};

// Checkout Component
const Checkout = ({ cartItems }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("credit-card");

  // Calculate the total price
  const total = cartItems
    .reduce((acc, item) => acc + parseFloat(item.price) * (item.quantity || 1), 0)
    .toFixed(2);

  // Convert total to cents for Stripe
  const amountInCents = Math.round(parseFloat(total) * 100);

  return (
    <CheckoutContainer>
      <Title>Checkout</Title>

      <CartSummary>
        <h3>Cart Summary</h3>
        {cartItems.map((item, index) => (
          <CartItem key={index}>
            <span>{item.name} (x{item.quantity || 1})</span>
            <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
          </CartItem>
        ))}
        <Total>Total: ${total}</Total>
      </CartSummary>

      <form>
        <InputField
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <div>
          <label>
            <input
              type="radio"
              value="credit-card"
              checked={payment === "credit-card"}
              onChange={() => setPayment("credit-card")}
            />
            Credit Card
          </label>
        </div>

        <Elements stripe={stripePromise}>
          <PaymentForm amount={amountInCents} />
        </Elements>
      </form>
    </CheckoutContainer>
  );
};

// ✅ PropTypes validation for Checkout
Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number, // Optional
    })
  ).isRequired,
};

export default Checkout;
