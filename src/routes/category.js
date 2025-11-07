import express from "express";

import upload from "../middleware/upload.js";
import {
  createNewArrivel,
  deleteNewArrivel,
  getAllNewArrivels,
  updateNewArrivel,
} from "../controllers/newArrivelsControllers.js";

const CategoryRouter = express.Router();

CategoryRouter.get("/", getAllNewArrivels);
CategoryRouter.post("/", upload.single("image"), createNewArrivel);
CategoryRouter.put("/:id", upload.single("image"), updateNewArrivel);
CategoryRouter.delete("/:id", deleteNewArrivel);

export default CategoryRouter;
