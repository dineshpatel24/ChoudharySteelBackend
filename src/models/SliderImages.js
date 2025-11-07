import mongoose from "mongoose";

const sliderImageSchema = new mongoose.Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    link: { type: String },
    images: [
      {
        imageUrl: { type: String, required: true },
        public_id: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("SliderImage", sliderImageSchema);
