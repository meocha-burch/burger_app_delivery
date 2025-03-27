import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "styled-components";

const CheckoutContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #ffcc00;
    color: black;
  }
`;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    // Call backend to create payment intent
    const res = await fetch("http://localhost:5000/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 999 }), // Example: $9.99
    });

    const { clientSecret } = await res.json();

    // Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    setLoading(false);

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setMessage("Payment successful!");
    }
  };

  return (
    <CheckoutContainer>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <CardElement options={{ hidePostalCode: true }} />
        <Button disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </form>
      {message && <p>{message}</p>}
    </CheckoutContainer>
  );
};

export default CheckoutForm;
