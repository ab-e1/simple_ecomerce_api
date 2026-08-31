import * as productController from "../controllers/productController.js";
import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { productSchema } from "../zSchema/productSchema.js";
import { roleCheck } from "../middleware/roleCheck.js";
import { validate } from "../middleware/validation.js";

  const router = Router();

router.get("/", auth, productController.listAllProducts);
router.get("/:id", auth, productController.getProductById);

router.post("/", auth, roleCheck("admin", "seller"),validate(productSchema), productController.createProduct);
router.patch("/:id", auth, roleCheck("admin"), productController.updateProduct);

router.delete("/:id", auth, roleCheck("admin"), productController.deleteProduct);

export default router;
