import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckoutForm from "../components/CheckoutForm"; // Import CheckoutForm

const CheckoutContainer = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
`;

const CheckoutTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffcc00;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CartItemsList = styled.ul`
  list-style-type: none; /* Remove bullet points */
  padding: 0;
  margin: 20px 0;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CartItem = styled.li`
  background-color: #222;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartItemText = styled.span`
  font-size: 1.1rem;
`;

const TotalAmountContainer = styled.div`
  background-color: #333;
  padding: 20px;
  margin-top: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
`;

const TotalText = styled.h2`
  color: #ffcc00;
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };

  console.log("Cart Items in Checkout Page:", cartItems);
  console.log("Total Amount in Checkout Page:", totalAmount);

  return (
    <CheckoutContainer>
      <CheckoutTitle>Complete Your Payment</CheckoutTitle>
      <h2>Review Your Cart</h2>

      <CartItemsList>
        {cartItems.map((item, index) => (
          <CartItem key={index}>
            <CartItemText>
              {item.name} - ${item.price.toFixed(2)} {item.quantity ? `x ${item.quantity}` : ""}
            </CartItemText>
          </CartItem>
        ))}
      </CartItemsList>

      <TotalAmountContainer>
        <TotalText>Total: ${totalAmount.toFixed(2)}</TotalText>
      </TotalAmountContainer>

      {/* Add CheckoutForm here */}
      <CheckoutForm cartItems={cartItems} />
    </CheckoutContainer>
  );
};

export default CheckoutPage;
