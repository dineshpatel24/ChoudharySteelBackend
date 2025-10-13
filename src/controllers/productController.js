import Product from "../models/Product.js";
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ data: products, message: "Products found" });
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
    }
    catch (err) {
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
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const createProduct = async (req, res) => {
    const { name, description, price, image, category, quantity } = req.body;
    try {
        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            quantity,
        });
        res.status(201).json({ data: product, message: "Product created" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ data: product, message: "Product updated" });
    }
    catch (err) {
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
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
