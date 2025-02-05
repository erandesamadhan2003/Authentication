import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Only 'user' and 'admin' roles are allowed
      default: "user",
    },
  },
  { timestamps: true }
);

// Create the User model and export it as a named export
export const User = mongoose.model("User", userSchema);
