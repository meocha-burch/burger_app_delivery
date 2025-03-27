import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"; // Import DB connection function
import authRoutes from "./routes/auth.js";
import menuRoutes from "./routes/menu.js"; // ✅ Import menu routes
import Stripe from "stripe"; // ✅ Import Stripe

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ Initialize Stripe

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Debugging: Check if MONGO_URI is loaded
console.log("MONGO_URI from .env:", process.env.MONGO_URI);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes); // ✅ Keep existing routes

// ✅ Stripe Payment Route
app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body; // Amount in cents (e.g., 999 = $9.99)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).send({ error: error.message });
  }
});

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
