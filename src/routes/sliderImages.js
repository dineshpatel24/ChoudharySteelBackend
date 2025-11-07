import express from "express";
import upload from "../middleware/upload.js";
import {
  createSliderImages,
  deleteSliderImage,
  getAllSliderImages,
  updateSliderImage,
} from "../controllers/sliderImagesControllers.js";

const SliderImagesRouter = express.Router();

SliderImagesRouter.get("/", getAllSliderImages);
SliderImagesRouter.post("/", upload.array("images", 10), createSliderImages);
SliderImagesRouter.put("/:id", upload.single("image"), updateSliderImage);
SliderImagesRouter.delete("/:id", deleteSliderImage);

export default SliderImagesRouter;
