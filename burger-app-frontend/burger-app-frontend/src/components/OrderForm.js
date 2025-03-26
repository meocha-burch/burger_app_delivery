import React, { useState } from "react";
import API from "../api";

const OrderForm = () => {
  const [burger, setBurger] = useState("");
  const [quantity, setQuantity] = useState(1);

  const placeOrder = async () => {
    try {
      const response = await API.post("/orders", { burger, quantity });
      console.log("Order placed:", response.data);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <h2>Place an Order</h2>
      <input
        type="text"
        placeholder="Burger Name"
        value={burger}
        onChange={(e) => setBurger(e.target.value)}
      />
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={placeOrder}>Order Now</button>
    </div>
  );
};

export default OrderForm;
