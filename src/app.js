import express from "express";
import authRoute from "./routes/authRoute.js";
import logger from "./middleware/logger.js";
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"

export const app = express();
app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
