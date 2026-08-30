import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["admin", "buyer", "seller"],
      default: "buyer",
    },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const User = new mongoose.model("User", userSchema);
