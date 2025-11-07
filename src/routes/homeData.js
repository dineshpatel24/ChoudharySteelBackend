import express from "express";
import {
  getHomeData,
  updateHomeData,
  createHomeData,
} from "../controllers/homeDataController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const HomeDataRouter = express.Router();

HomeDataRouter.get("/", getHomeData);

HomeDataRouter.put(
  "/",
  protect,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "sliders", maxCount: 5 },
    { name: "featuredCategories", maxCount: 10 },
  ]),
  updateHomeData
);

HomeDataRouter.post(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "sliders", maxCount: 5 },
    { name: "featuredCategories", maxCount: 10 },
  ]),
  createHomeData
);

export default HomeDataRouter;
