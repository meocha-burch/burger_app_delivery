import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import { loginUser, getProfile } from "../controllers/authController.js";

const router = express.Router();

// ✅ Check authentication and return user info
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("🔥 Auth Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Register User Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("🔥 Registration Error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ✅ Login Route (Handled by Controller)
router.post("/login", loginUser);

// ✅ Protected Profile Route (Requires Authentication)
router.get("/profile", verifyToken, getProfile);

export default router;
