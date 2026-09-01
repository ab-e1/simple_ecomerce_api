import { Router } from "express";
import * as cartController from "../controllers/cartController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, cartController.listCart);

router.post("/item", auth, cartController.addToCart);

router.delete("/item/:id", auth, cartController.deleteFromCart);

export default router;
