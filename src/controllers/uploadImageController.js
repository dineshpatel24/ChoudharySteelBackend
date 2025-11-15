import Image from "../models/Image.js";
import cloudinary from "cloudinary";

// Cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    // Save to DB
    const image = await Image.create({
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      data: image,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};


export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({
      message: "Images fetched successfully",
      data: images,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch images",
      error: err.message,
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Remove from Cloudinary
    await cloudinary.v2.uploader.destroy(image.public_id);

    // Remove from DB
    await Image.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to delete image",
      error: err.message,
    });
  }
};