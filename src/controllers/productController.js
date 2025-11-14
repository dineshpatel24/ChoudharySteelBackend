import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, page = 1, limit = 100 } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) query.category = category;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Convert page + limit to numbers
    const skip = (Number(page) - 1) * Number(limit);

    // Query DB
    const [products, total] = await Promise.all([
      Product.find(query)
        .skip(skip)
        .limit(Number(limit)),

      Product.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      ok: true,
      message: "Products found",
      data: products,
      pagination: {
        total,
        totalPages,
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ data: product, message: "Product found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ⛳ CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      discountPercentage,
      category,
      quantity,
      image,
      images,
    } = req.body;

    const mainImage =
      req.files?.image?.[0]?.path || image || null;

    const galleryImages =
      req.files?.images?.map((f) => f.path) ||
      (Array.isArray(images) ? images : images ? [images] : []);

    if (!mainImage)
      return res.status(400).json({ message: "Main image is required" });

    // Auto-calc discount if not sent
    const finalDiscount =
      discountPercentage ||
      (originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0);

    const product = await Product.create({
      name,
      description,
      price,
      originalPrice,
      discountPercentage: finalDiscount,
      category,
      quantity,
      image: mainImage,
      images: galleryImages,
    });

    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: err.message });
  }
};


// ⛳ UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const existing = await Product.findById(req.params.id);
    if (!existing)
      return res.status(404).json({ message: "Product not found" });

    const {
      name,
      description,
      price,
      originalPrice,
      discountPercentage,
      category,
      quantity,
      image,
      images,
    } = req.body;

    const mainImage =
      req.files?.image?.[0]?.path || image || existing.image;

    let galleryImages = existing.images;

    if (req.files?.images) {
      galleryImages = req.files.images.map((f) => f.path);
    } else if (images) {
      galleryImages = Array.isArray(images) ? images : [images];
    }

    // auto-calc discount if needed
    const finalDiscount =
      discountPercentage ||
      (originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : existing.discountPercentage);

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        originalPrice,
        discountPercentage: finalDiscount,
        category,
        quantity,
        image: mainImage,
        images: galleryImages,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: err.message });
  }
};


// ⛳ DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({
      message: "Product deleted successfully",
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};