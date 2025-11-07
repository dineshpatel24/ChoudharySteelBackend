import SliderImage from "../models/sliderImage.js";

// ✅ Get all slider images
export const getAllSliderImages = async (req, res) => {
  try {
    const sliderImages = await SliderImage.find();
    if (!sliderImages || sliderImages.length === 0)
      return res.status(404).json({ message: "No slider images found" });

    res.status(200).json({
      data: sliderImages,
      message: "Retrieved all slider images",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create (upload or select existing)
export const createSliderImages = async (req, res) => {
  try {
    const files = req.files || [];
    const { title, subtitle, link, selectedImages } = req.body;

    let imageList = [];

    // Uploaded new images
    if (files.length > 0) {
      imageList = files.map((file) => ({
        imageUrl: file.path,
        public_id: file.filename || null,
      }));
    }

    // Add existing images
    if (selectedImages) {
      const parsed = JSON.parse(selectedImages);
      parsed.forEach((url) =>
        imageList.push({ imageUrl: url, public_id: null })
      );
    }

    if (imageList.length === 0)
      return res.status(400).json({ message: "No images provided" });

    const newSlider = new SliderImage({
      title,
      subtitle,
      link,
      images: imageList,
    });

    const saved = await newSlider.save();

    res.status(201).json({
      data: saved,
      message: "Slider images added successfully",
    });
  } catch (error) {
    console.error("Error creating slider images:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update single slider
export const updateSliderImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, link, imageUrl } = req.body;
    const updateData = { title, subtitle, link };

    if (req.file) {
      updateData.images = [{ imageUrl: req.file.path }];
    } else if (imageUrl) {
      updateData.images = [{ imageUrl }];
    }

    const updated = await SliderImage.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated)
      return res.status(404).json({ message: "Slider image not found" });

    res.status(200).json({
      data: updated,
      message: "Slider image updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete slider by ID
export const deleteSliderImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SliderImage.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ message: "Slider image not found" });

    res.status(200).json({
      data: deleted,
      message: "Slider image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
