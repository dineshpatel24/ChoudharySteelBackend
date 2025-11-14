import express from "express";
import {
  getAnalytics,
  incrementProductView,
  incrementSearch,
} from "../controllers/analyticsController.js";

const analyticsRouter = express.Router();

analyticsRouter.get("/", getAnalytics);
analyticsRouter.post("/product-view", incrementProductView);
analyticsRouter.post("/search", incrementSearch);

export default analyticsRouter;
