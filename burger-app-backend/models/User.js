import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {

    username: { 
      type: String, 
      required: true,  // ✅ Ensure username is required
      unique: true,    // ✅ Prevent duplicate usernames
      trim: true       // ✅ Remove whitespace from both ends
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
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // ✅ Email validation
    },
    password: { 
      type: String, 
      required: true, 
      select: true   // ✅ Hide password by default in queries
    },
  }, 
  { timestamps: true } // ✅ Adds createdAt & updatedAt fields
);

export default mongoose.model("User", UserSchema);
