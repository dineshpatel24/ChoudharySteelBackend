import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import UserRouter from "./routes/userRoutes.js";
import ProductRouter from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://csi-full-stack-project.vercel.app",
    "http://localhost:3001",
    "https://twist-knot.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.get("/", (req, res) => res.send("Choudhary Steel API running"));

app.use("/api/users", UserRouter);
app.use("/api/products", ProductRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

export default app;
