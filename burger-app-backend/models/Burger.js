import mongoose from "mongoose";

const BurgerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // URL or image path
    required: true,
  },
  description: {
    type: String,
    required: false, // Optional field
  },
  category: {
    type: String,
    enum: ["beef", "chicken", "veggie", "other"],
    default: "other",
  },
});

const Burger = mongoose.model("Burger", BurgerSchema);

export default Burger; // ✅ ES Module export
