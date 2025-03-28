import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ name: String, price: Number }],
    status: { type: String, default: "Pending" },
  },
  { timestamps: true } // ✅ Automatically adds createdAt & updatedAt
);

const Order = mongoose.model("Order", orderSchema);

export default Order; // ✅ ES Module export

