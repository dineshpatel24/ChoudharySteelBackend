import express from "express";
import {
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
} from "../controllers/announcementController.js";

const announcementRouter = express.Router();

announcementRouter.get("/", getAnnouncement);
announcementRouter.post("/", createAnnouncement);
announcementRouter.put("/:id", updateAnnouncement);

export default announcementRouter;