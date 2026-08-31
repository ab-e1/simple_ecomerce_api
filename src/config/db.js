import mongoose from "mongoose";
import { mongoDbUri } from "./loadEnv.js";

export const connectDb = async () => {
  if (!mongoDbUri) {
    return {
      ok: false,
      error:
        "MONGO_URI missing in the .env .copy from env.example, and set the value",
    };
  }
  await mongoose.connect(mongoDbUri);
  return {
    ok: true,
    data: "monogdb connected",
  };
};
