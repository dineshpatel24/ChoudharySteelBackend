import mongoose from "mongoose";

const homePageSchema = new mongoose.Schema(
  {
    logo: {
      type: String, 
      required: true,
      default: "/images/logo.png",
    },

    sliders: [
      {
        image: { type: String, required: true },
        title: { type: String },
        subtitle: { type: String },
        link: { type: String },
      },
    ],

    featuredCategories: [
      {
        name: { type: String, required: true },
        image: { type: String },
        link: { type: String },
      },
    ],

    newArrivals: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to your Product model
        },
      },
    ],

    trendingProducts: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],

    offerBanners: [
      {
        image: { type: String },
        link: { type: String },
        title: { type: String },
      },
    ],

    footer: {
      aboutText: { type: String },
      contactEmail: { type: String },
      contactPhone: { type: String },
      address: { type: String },
      socialLinks: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
      },
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("HomePage", homePageSchema);