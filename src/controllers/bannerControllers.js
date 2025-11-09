import Banner from "../models/Banner.js";

// Create Banner
export const createBanner = async (req, res) => {
  try {
    const { selectedImage, title, subtitle, altText, link } = req.body;

    const bannerCount = await Banner.countDocuments();
    if (bannerCount >= 2) {
      return res
        .status(400)
        .json({ message: "You can only upload up to 2 banners!" });
    }

    const imageUrl = req.file ? req.file.path : selectedImage || null;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newBanner = new Banner({
      image: imageUrl,
      title: title || "",
      subtitle: subtitle || "",
      altText: altText || "",
      link: link || "",
    });

    await newBanner.save();

    return res
      .status(201)
      .json({ message: "Banner created successfully", banner: newBanner });
  } catch (err) {
    console.error("Create Banner Error:", err);
    return res.status(500).json({ message: err.message });
  }
};

//  Get All Banners
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "Banners fetched successfully", data: banners });
  } catch (err) {
    console.error("Fetch Banners Error:", err);
    return res.status(500).json({ message: err.message });
  }
};

//  Delete Banner
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBanner = await Banner.findByIdAndDelete(id);
    if (!deletedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    return res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Delete Banner Error:", err);
    return res.status(500).json({ message: err.message });
  }
};

//  Update Banner
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { selectedImage, title, subtitle, altText, link } = req.body;

    const imageUrl = req.file ? req.file.path : selectedImage || undefined;

    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      {
        ...(imageUrl && { image: imageUrl }),
        ...(title && { title }),
        ...(subtitle && { subtitle }),
        ...(altText && { altText }),
        ...(link && { link }),
      },
      { new: true }
    );

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    return res
      .status(200)
      .json({ message: "Banner updated successfully", banner: updatedBanner });
  } catch (err) {
    console.error("Update Banner Error:", err);
    return res.status(500).json({ message: err.message });
  }
};
