// routes/theme.js (example)
import express from "express";
import {
  getThemeSettings,
  updateThemeSettings,
} from "../controllers/themeSettingsController.js";

const router = express.Router();

router.get("/", getThemeSettings);
router.put("/", updateThemeSettings);

export default router;
