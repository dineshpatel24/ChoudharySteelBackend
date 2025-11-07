import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    altText: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
