import React from "react"; 
import styled from "styled-components";
import PropTypes from "prop-types"; // Import PropTypes for validation

const CheckoutContainer = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 40px 10%;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const CheckoutItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CheckoutItem = styled.div`
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

const CheckoutPage = ({ cartItems, handleSubmit }) => {
  return (
    <CheckoutContainer>
      <Title>Checkout</Title>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <CheckoutItems>
          {cartItems.map((item, index) => (
            <CheckoutItem key={index}>
              <ItemDetails>
                <ItemImage src={item.image} alt={item.name} />
                <ItemText>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>${item.price}</ItemPrice>
                </ItemText>
              </ItemDetails>
            </CheckoutItem>
          ))}
        </CheckoutItems>
      )}
      <button onClick={handleSubmit}>Submit Order</button>
    </CheckoutContainer>
  );
};

// Prop validation for CheckoutPage
CheckoutPage.propTypes = {
  cartItems: PropTypes.array.isRequired, // Ensure cartItems is an array
  handleSubmit: PropTypes.func.isRequired, // Ensure handleSubmit is a function and required
};

export default CheckoutPage;
