import express from "express";
import {
  RegisterUser,
  LoginUser,
  getUserByIdProfile,
  LogoutUser,
  getAllUsers,
  deleteUser,
  sendOtp,
  verifyOtp,
  verifyRegisterOtp,
  sendRegisterOtp,
  sendForgotOtp,
  verifyForgotOtp,
  resetPassword,
  updateUser,
} from "../controllers/userController.js";

import { protect, requireSuperAdmin } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res, next) => {
  const superAdminExists = await User.findOne({ role: "superadmin" });

  if (!superAdminExists) {
    // FIRST USER → SUPERADMIN (open route)
    return RegisterUser(req, res);
  }

  // SUPERADMIN exists → only superadmin can create users
  return protect(req, res, () =>
    requireSuperAdmin(req, res, () => RegisterUser(req, res))
  );
});

UserRouter.post("/login", LoginUser);
UserRouter.get("/profile", protect, getUserByIdProfile);
UserRouter.post("/logout", protect, LogoutUser);
UserRouter.get("/all", protect, getAllUsers);
UserRouter.delete("/delete/:id", protect, deleteUser);
UserRouter.put("/update/:id", protect, requireSuperAdmin, updateUser);
UserRouter.post("/send-otp", sendOtp);
UserRouter.post("/verify-otp", verifyOtp);

UserRouter.post("/register-send-otp", sendRegisterOtp);
UserRouter.post("/register-verify-otp", verifyRegisterOtp);

UserRouter.post("/forgot-password-send-otp", sendForgotOtp);
UserRouter.post("/forgot-password-verify-otp", verifyForgotOtp);
UserRouter.post("/reset-password", resetPassword);

export default UserRouter;
