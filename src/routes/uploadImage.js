import express from "express";
import {
  uploadImage,
  getAllImages,
} from "../controllers/uploadImageController.js";
import upload from "../middleware/upload.js";
const UploadImageRouter = express.Router();
UploadImageRouter.post("/", upload.single("image"), uploadImage);

UploadImageRouter.get("/", getAllImages);

export default UploadImageRouter;
