import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryControllers.js";
import upload from "../middleware/upload.js";

const NewArrivelsRouter = express.Router();

NewArrivelsRouter.get("/", getAllCategories);
NewArrivelsRouter.post("/", upload.single("image"), createCategory);
NewArrivelsRouter.put("/:id", upload.single("image"), updateCategory);
NewArrivelsRouter.delete("/:id", deleteCategory);

export default NewArrivelsRouter;
