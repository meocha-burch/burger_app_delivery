import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for validation

const CartContainer = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 40px 10%;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

const ItemText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.h3`
  margin: 0;
`;

const ItemPrice = styled.p`
  margin: 0;
  color: #28a745;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const CheckoutButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 20px;
  padding: 15px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const CartPage = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    console.log("Proceed to Checkout clicked. Cart items:", cartItems); // Debugging log
    if (cartItems.length === 0) {
      alert("Your cart is empty! Add items before checking out.");
    } else {
      navigate("/checkout"); // Navigate to checkout page
    }
  };

  return (
    <CartContainer>
      <Title>Shopping Cart</Title>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <CartItems>
          {cartItems.map((item, index) => (
            <CartItem key={index}>
              <ItemDetails>
                <ItemImage src={item.image} alt={item.name} />
                <ItemText>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>${item.price}</ItemPrice>
                </ItemText>
              </ItemDetails>
              <RemoveButton onClick={() => removeFromCart(index)}>
                Remove
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>
      )}
      {cartItems.length > 0 && (
        <CheckoutButton onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </CheckoutButton>
      )}
    </CartContainer>
  );
};

// Prop validation for CartPage
CartPage.propTypes = {
  cartItems: PropTypes.array.isRequired, // Ensure cartItems is an array
  removeFromCart: PropTypes.func.isRequired, // Ensure removeFromCart is a function
};

export default CartPage;
