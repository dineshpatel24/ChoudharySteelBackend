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
import SocialLinkRouter from "./routes/socialLinkRoutes.js";
import announcementRouter from "./routes/announcementRoutes.js";
import { trackVisitor } from "./middleware/trackVisitor.js";
import analyticsRouter from "./routes/analyticsRoutes.js";
import themeRoutes from "./routes/theme.js";
import testimonialRouter from "./routes/testimonialRoutes.js";

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://admin.twist-knot.com",
  "https://www.twist-knot.com",
  "https://twist-knot.com",
  "https://twist-knot.vercel.app",
  "https://csi-full-stack-project.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // mobile / curl / postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS blocked by server: " + origin), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(trackVisitor);
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
app.use("/api/social-links", SocialLinkRouter);
app.use("/api/announcement", announcementRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/theme", themeRoutes);
app.use("/api/testimonials", testimonialRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

export default app;
