import express from "express";
import authRoute from "./routes/authRoute.js";

export const app = express();
app.use(express.json());

app.use("/api/auth", authRoute);
