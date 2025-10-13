

import express from "express";
import { RegisterUser, LoginUser, getUserByIdProfile, } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const UserRouter = express.Router();
UserRouter.post("/register", RegisterUser);
UserRouter.post("/login", LoginUser);
UserRouter.get("/profile", protect, getUserByIdProfile);
export default UserRouter;