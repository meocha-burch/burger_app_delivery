import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔐 Function to Generate JWT
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables.");
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// 📌 LOGIN USER
export const loginUser = async (req, res) => {
  try {
    console.log("📩 Received login request:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log("🔍 User found:", user ? "Yes" : "No");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" }); // Security improvement
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Set HTTP-only cookie with JWT
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax", // 🔧 Allows cross-site requests in most cases
    });

    res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });

  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// 📌 GET PROFILE (Requires Auth Middleware)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("🔥 Profile Fetch Error:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// 📌 REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("🔥 Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

