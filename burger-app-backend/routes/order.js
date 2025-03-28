import express from "express";
import Order from "../models/Order.js"; // ✅ Ensure the file extension is included

const router = express.Router();

// Place Order
router.post("/", async (req, res) => {
  try {
    const { items, user } = req.body;

    const newOrder = new Order({
      user,
      items,
      status: "Pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; // ✅ Use ES Module export
