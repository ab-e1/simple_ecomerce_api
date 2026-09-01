import express from "express";
import swaggerUi from "swagger-ui-express";
import authRoute from "./routes/authRoute.js";
import logger from "./middleware/logger.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import { swaggerSpec } from "./config/swagger.js";
import { errorHandeler } from "./middleware/errorHandler.js";

export const app = express();
app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandeler);
