import Category from "../models/Category.js";


export const createCategory = async (req, res) => {
  try {
    const { title, description, altText, selectedImage } = req.body;

    // Handle uploaded file OR existing selected image URL
    const imageUrl = req.file ? req.file.path : selectedImage || null;

    const newCategory = await Category.create({
      title,
      description,
      altText,
      image: imageUrl,
    });

    res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (err) {
    console.error("Create category error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get all categories
 * @route GET /api/categories
 */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Update category
 * @route PUT /api/categories/:id
 */
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, altText, selectedImage, existingImage } =
      req.body;

    // Choose new uploaded file or fallback to existing/selected image
    const imageUrl = req.file
      ? req.file.path
      : selectedImage || existingImage || undefined;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { title, description, altText, image: imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (err) {
    console.error("Update category error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ message: err.message });
  }
};
