import jwt from "jsonwebtoken";
import User from "../models/User.js";
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
export const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

// export const sendTokenAsCookie = (res, userId) => {
//   const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     path: "/",
//   });
//   return token;
// };

export const requireSuperAdmin = async (req, res, next) => {
  try {
    // req.user protect se milta hai
    const user = req.user;

    if (!user || user.role !== "superadmin") {
      return res.status(403).json({
        message: "Access denied. Only SuperAdmin can access this route.",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendTokenAsCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/", // 
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
