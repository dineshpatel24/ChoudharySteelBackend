import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
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

    // FINAL SELLING PRICE
    price: { type: Number, required: true },

    // ORIGINAL MRP
    originalPrice: { type: Number, required: false },

    // DISCOUNT % (optional)
    discountPercentage: { type: Number, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);