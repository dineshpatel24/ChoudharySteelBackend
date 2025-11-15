import express from "express";
import {
  uploadImage,
  getAllImages,
  deleteImage,
} from "../controllers/uploadImageController.js";
import upload from "../middleware/upload.js";
const UploadImageRouter = express.Router();
UploadImageRouter.post("/", upload.single("image"), uploadImage);

UploadImageRouter.get("/", getAllImages);
UploadImageRouter.delete("/:id", deleteImage);

export default UploadImageRouter;
