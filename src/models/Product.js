import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },

  // MAIN IMAGE
  image: { type: String, required: true },

  // MULTIPLE GALLERY IMAGES
  images: {
    type: [String],
    default: [],
  },

  price: { type: Number, required: true },
});

export const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;