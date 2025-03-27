import express from "express";
import bcrypt from "bcryptjs"; // ✅ Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // ✅ Import jwt for token generation
import User from "../models/User.js";
import { loginUser, getProfile } from "../controllers/authController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Register User Route
router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("🔥 Registration Error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ✅ Login Route (Handled by Controller)
router.post("/login", loginUser);

// ✅ Protected Profile Route (Requires Authentication)
router.get("/profile", authenticateUser, getProfile);

export default router;
