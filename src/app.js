import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import UserRouter from "./routes/userRoutes.js";
import ProductRouter from "./routes/productRoutes.js";
import HomeDataRouter from "./routes/homeData.js";
import uploadImageRouter from "./routes/uploadImage.js";
import cookieParser from "cookie-parser";
import LogoRouter from "./routes/logo.js";
import SliderImagesRouter from "./routes/sliderImages.js";
import CategoryRouter from "./routes/category.js";
import NewArrivelsRouter from "./routes/newArrivels.js";
import enquiryRoute from "./routes/enquiryRoute.js";
import bannerRouter from "./routes/bannerRoute.js";

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://csi-full-stack-project.vercel.app",
    "https://twist-knot.vercel.app",
    "https://choudharysteelbackend.onrender.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

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
app.use("/api/homedata", HomeDataRouter);
app.use("/api/upload", uploadImageRouter);
app.use("/api/logo", LogoRouter);
app.use("/api/slider-images", SliderImagesRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/new-arrivals", NewArrivelsRouter);
app.use("/api/enquiry", enquiryRoute);
app.use("/api/banners", bannerRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

export default app;
