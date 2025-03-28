import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"; // Import DB connection function
import authRoutes from "./routes/auth.js";
import menuRoutes from "./routes/menu.js"; // ✅ Import menu routes
import Stripe from "stripe"; // ✅ Import Stripe
import nodemailer from "nodemailer"; // Import nodemailer to send emails

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ Initialize Stripe
const PORT = process.env.PORT || 5001; // ✅ Define PORT here

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);

// Debugging: Check if MONGO_URI is loaded
console.log("MONGO_URI from .env:", process.env.MONGO_URI);

// ✅ Connect to MongoDB before starting the server
connectDB()
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit if DB connection fails
  });

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Using Gmail as an example, can be switched to another service
  auth: {
    user: process.env.EMAIL_USER, // Your email address in .env file
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

// Contact form route (POST)
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Create the email content
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Replace with your email to receive contact messages
    subject: `New Message from ${name}`,
    text: `
      You have a new contact form submission:

      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({ message: "Error sending message. Please try again later." });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes); // ✅ Keep existing routes

// ✅ Stripe Payment Route to Create PaymentIntent
app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body; // Amount in cents (e.g., 999 = $9.99)

    // ✅ Validate amount before calling Stripe
    if (!amount || amount < 50) {
      return res.status(400).send({ error: "Invalid payment amount" });
    }

    console.log("🔹 Payment Intent Requested:", amount);

    // Create a PaymentIntent with the amount and currency (USD)
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents (e.g., 999 = $9.99)
      currency: "usd", // Currency (USD in this case)
      payment_method_types: ["card"], // You can add other payment methods here like 'paypal', etc.
    });

    // Send the client_secret to the client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("❌ Stripe Error:", error);
    res.status(500).send({ error: error.message });
  }
});

// ✅ Start Server only after successful DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ Server could not start due to DB connection failure.");
    process.exit(1);
  });
