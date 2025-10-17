import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const ProductRouter = express.Router();

ProductRouter.post("/", upload.single("image"), protect, createProduct);
ProductRouter.get("/", getAllProducts);

ProductRouter.get("/:id", getProduct);
ProductRouter.delete("/:id", protect, deleteProduct);

ProductRouter.put("/:id", upload.single("image"), protect, updateProduct);

export default ProductRouter;
