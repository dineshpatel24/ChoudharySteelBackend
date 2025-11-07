import Image from "../models/Image.js";

// Upload a single image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const image = await Image.create({
      imageUrl: req.file.path,
      public_id: req.file.filename,
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      data: image,
      imageUrl: image.imageUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};


// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({
      message: "Images fetched successfully",
      data: images,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch images", error: err.message });
  }
};
