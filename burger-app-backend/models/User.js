import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      trim: true, 
      unique: true, 
      sparse: true, // ✅ Prevents duplicate error if `null`
    },
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true, // ✅ Make emails case-insensitive
      validate: {
        validator: function (email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Invalid email format",
      },
    },
    password: { 
      type: String, 
      required: true, 
      select: false // ✅ Hide password in queries by default
    },
  }, 
  { timestamps: true } // ✅ Adds `createdAt` & `updatedAt`
);

// ✅ Ensure passwords are hidden in queries unless explicitly selected
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
