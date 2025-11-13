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
ProductRouter.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  protect,
  createProduct
);
ProductRouter.get("/", getAllProducts);

ProductRouter.get("/:id", getProduct);
ProductRouter.delete("/:id", protect, deleteProduct);

ProductRouter.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  protect,
  updateProduct
);

export default ProductRouter;
