import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CheckoutPageWithStripe from "../pages/CheckoutPage"; 

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
  list-style-type: none;
  padding: 0;
  margin: 0;
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

  const totalPrice = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty! Add items before proceeding.");
      return;
    }

    navigate("/checkout", { state: { cartItems, totalAmount: totalPrice } });
  };

  return (
    <OrderContainer>
      <OrderTitle>Review Your Cart</OrderTitle>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add some delicious burgers!</p>
      ) : (
        <>
          <OrderList>
            {cartItems.map((item, index) => (
              <OrderItem key={item.id || `cart-item-${index}`}>
                <span>
                  {item.name} - ${item.price.toFixed(2)} {item.quantity ? `x ${item.quantity}` : ""}
                </span>
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
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/checkout" element={<CheckoutPageWithStripe />} />
      </Routes>
    </Router>
  );
};

export default OrderPage;
