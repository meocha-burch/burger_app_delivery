import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for validation

const OrderContainer = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
`;

const OrderTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffcc00;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OrderItem = styled.li`
  background: #222;
  padding: 15px;
  border-radius: 8px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: darkred;
  }
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
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #e6b800;
  }
`;

const OrderPage = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty! Add items before proceeding.");
      return;
    }
    navigate("/checkout");
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <OrderContainer>
      <OrderTitle>Review Your Order</OrderTitle>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add some delicious burgers!</p>
      ) : (
        <>
          <OrderList>
            {cartItems.map((item) => (
              <OrderItem key={item.id}>
                <span>{item.name} - ${item.price.toFixed(2)}</span>
                <RemoveButton onClick={() => removeFromCart(item.id)}>Remove</RemoveButton>
              </OrderItem>
            ))}
          </OrderList>

          <h2>Total: ${totalPrice.toFixed(2)}</h2>

          <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
        </>
      )}
    </OrderContainer>
  );
};

// PropTypes validation
OrderPage.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired, // Validate that cartItems is an array of objects with specific properties
  removeFromCart: PropTypes.func.isRequired, // Validate that removeFromCart is a function
};

export default OrderPage;
