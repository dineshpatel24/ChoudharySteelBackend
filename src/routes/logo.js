import express from "express";
import {
  getLogo,
  createLogo,
  updateLogo,
} from "../controllers/logoController.js";
import upload from "../middleware/upload.js";

const LogoRouter = express.Router();

LogoRouter.get("/", getLogo);
LogoRouter.post("/", upload.single("logo"), createLogo);
LogoRouter.put("/", upload.single("logo"), updateLogo);

export default LogoRouter;
