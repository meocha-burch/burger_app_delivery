import { useState } from "react";
import styled from "styled-components";

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

const Checkout = ({ cartItems }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("credit-card");

  // Calculate the total price
  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed for ${name}`);
  };

  return (
    <CheckoutContainer>
      <Title>Checkout</Title>

      <CartSummary>
        <h3>Cart Summary</h3>
        {cartItems.map((item, index) => (
          <CartItem key={index}>
            <span>{item.name}</span>
            <span>${item.price}</span>
          </CartItem>
        ))}
        <Total>Total: ${total}</Total>
      </CartSummary>

      <form onSubmit={handleSubmit}>
        <InputField type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
        <InputField type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <InputField type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} required />

        <div>
          <label>
            <input type="radio" value="credit-card" checked={payment === "credit-card"} onChange={() => setPayment("credit-card")} />
            Credit Card
          </label>
          <label>
            <input type="radio" value="paypal" checked={payment === "paypal"} onChange={() => setPayment("paypal")} />
            PayPal
          </label>
        </div>

        <Button type="submit">Place Order</Button>
      </form>
    </CheckoutContainer>
  );
};

export default Checkout;
