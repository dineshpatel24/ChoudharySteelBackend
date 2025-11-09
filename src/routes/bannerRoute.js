import express from "express";
import {
  createBanner,
  deleteBanner,
  getAllBanners,
  updateBanner,
} from "../controllers/bannerControllers.js";
import upload from "../middleware/upload.js";

const bannerRouter = express.Router();

bannerRouter.get("/", getAllBanners);
bannerRouter.post("/", upload.single("image"), createBanner);
bannerRouter.delete("/:id", deleteBanner);
bannerRouter.put("/:id", upload.single("image"), updateBanner);

export default bannerRouter;
