import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import UserRouter from "./routes/userRoutes.js";
import ProductRouter from "./routes/productRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: ["http://localhost:3000", "https://your-frontend-domain.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.get("/", (req, res) => res.send("Choudhary Steel API running"));

app.use("/api/users", UserRouter);
app.use("/api/products", protect, ProductRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
