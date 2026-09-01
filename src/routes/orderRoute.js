import { Router } from "express";
import * as orderController from "../controllers/orderController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, orderController.listOrder);

router.post("/create", auth, orderController.createOrder);

export default router;
