import dotenv from "dotenv";

dotenv.config();
export const port = process.env.PORT || 3000;
export const jwtSecret =
  process.env.JWT_SECRET || "default_jw_secret_change_it_imediately_or_soon";
export const mongoDbUri = process.env.MONGO_URI;
export const mongoDbPassword = process.env.MONGO_PASSWORD;
