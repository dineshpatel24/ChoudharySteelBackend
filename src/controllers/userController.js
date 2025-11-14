import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { sendTokenAsCookie } from "../middleware/authMiddleware.js";
import { sendEmail } from "../utils/sendEmail.js";

export const sendRegisterOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if already registered
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP temporarily in memory (or Redis)
    global.registrationOtps = global.registrationOtps || {};
    global.registrationOtps[email] = {
      otp,
      expire: Date.now() + 5 * 60 * 1000,
    };

    const html = `
      <h3>Verify Your Email</h3>
      <p>Your OTP is <strong>${otp}</strong></p>
      <p>This OTP expires in 5 minutes.</p>
    `;

    await sendEmail(email, "Registration OTP", html);

    res.json({ message: "OTP sent for registration" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyRegisterOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const stored = global.registrationOtps?.[email];
    if (!stored) return res.status(400).json({ message: "OTP not found" });

    if (stored.expire < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    if (stored.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    // ❗ DO NOT DELETE OTP HERE
    // delete global.registrationOtps[email];

    return res.json({ message: "OTP verified, proceed with registration" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    await user.save();

    const html = `
      <h2>Your Verification Code</h2>
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>This code expires in 5 minutes.</p>
    `;

    await sendEmail(email, "Your Twist-Knot OTP", html);

    res.json({ message: "OTP sent successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    if (user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpire < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.emailVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    res.json({ message: "OTP verified successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ data: users, message: "Users found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    // Must verify OTP first
    if (!global.registrationOtps || !global.registrationOtps[email])
      return res.status(400).json({ message: "OTP not verified" });

    // OTP matches & valid
    const stored = global.registrationOtps[email];
    if (stored.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (stored.expire < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    // If superadmin not exists
    const superAdminExists = await User.findOne({ role: "superadmin" });
    let role = superAdminExists ? "admin" : "superadmin";

    // create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      emailVerified: true,
    });

    delete global.registrationOtps[email];

    res.status(201).json({
      message: "Registration successful",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    sendTokenAsCookie(res, user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      expires: new Date(0),
      path: "/",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserByIdProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ data: user, message: "User profile fetched successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendForgotOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    global.forgotOtps = global.forgotOtps || {};
    global.forgotOtps[email] = {
      otp,
      expire: Date.now() + 5 * 60 * 1000,
    };

    const html = `
      <h3>Password Reset OTP</h3>
      <p>Your OTP is <strong>${otp}</strong></p>
      <p>Expires in 5 minutes.</p>
    `;

    await sendEmail(email, "Twist-Knot Password Reset", html);

    res.json({ message: "OTP sent to email!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyForgotOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const stored = global.forgotOtps?.[email];

    if (!stored) return res.status(400).json({ message: "OTP not found" });

    if (stored.expire < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    if (stored.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    res.json({ message: "OTP verified successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    delete global.forgotOtps?.[email];

    res.json({ message: "Password reset successful!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // user being edited
    const { name, email, password } = req.body;

    const userToEdit = await User.findById(id);
    if (!userToEdit) {
      return res.status(404).json({ message: "User not found" });
    }

    const loggedInUser = req.user; // superadmin

    // Block editing other superadmins
    if (
      userToEdit.role === "superadmin" &&
      userToEdit._id.toString() !== loggedInUser._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You cannot edit another SuperAdmin" });
    }

    // Apply changes
    if (name) userToEdit.name = name;
    if (email) userToEdit.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userToEdit.password = hashedPassword;
    }

    await userToEdit.save();

    res.json({ message: "User updated successfully", user: userToEdit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
