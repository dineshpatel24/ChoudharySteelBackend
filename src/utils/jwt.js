// utils/jwt.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const EXPIRES_IN = "7d";

// 🔹 Create a token when user logs in
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

// 🔹 Verify token
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
