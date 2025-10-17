import Product from "../models/Product.js";
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products, message: "Products found" });
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ data: product, message: "Product found" });
    console.log();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;

    // Get image uploaded via multer-cloudinary
    const image = req.file ? req.file.path : null;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      quantity,
      image, // save Cloudinary URL
    });

    res.status(201).json({ data: product, message: "Product created" });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: err.message });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

  
    let imageUrl = existingProduct.image; 

    if (req.file) {
      imageUrl = req.file.path;
    } else if (req.body.currentImage) {
      imageUrl = req.body.currentImage;
    }

    // Update all other fields
    const updatedData = {
      name: req.body.name || existingProduct.name,
      description: req.body.description || existingProduct.description,
      category: req.body.category || existingProduct.category,
      quantity: req.body.quantity || existingProduct.quantity,
      price: req.body.price || existingProduct.price,
      image: imageUrl,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true, 
    });

    res
      .status(200)
      .json({ data: updatedProduct, message: "Product updated successfully" });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: err.message });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      data: product,
      message: "Product deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
