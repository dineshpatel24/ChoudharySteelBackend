import express from "express";
import { getEnquiries, sendEnquiry } from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/", sendEnquiry);
router.get("/", getEnquiries);

export default router;
