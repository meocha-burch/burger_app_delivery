import express from "express";
import Burger from "../models/Burger.js";

const router = express.Router();

// ✅ Get All Burgers (Menu)
router.get("/", async (req, res) => {
  try {
    const burgers = await Burger.find();
    res.json(burgers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get a Single Burger by ID
router.get("/:id", async (req, res) => {
  try {
    const burger = await Burger.findById(req.params.id);
    if (!burger) {
      return res.status(404).json({ error: "Burger not found" });
    }
    res.json(burger);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add a New Burger (Admin Only in the Future)
router.post("/", async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;
    const newBurger = new Burger({ name, price, image, description, category });

    await newBurger.save();
    res.status(201).json({ message: "Burger added successfully", burger: newBurger });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update a Burger by ID (Admin Only in the Future)
router.put("/:id", async (req, res) => {
  try {
    const updatedBurger = await Burger.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedBurger) {
      return res.status(404).json({ error: "Burger not found" });
    }

    res.json({ message: "Burger updated successfully", burger: updatedBurger });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete a Burger by ID (Admin Only in the Future)
router.delete("/:id", async (req, res) => {
  try {
    const deletedBurger = await Burger.findByIdAndDelete(req.params.id);

    if (!deletedBurger) {
      return res.status(404).json({ error: "Burger not found" });
    }

    res.json({ message: "Burger deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
