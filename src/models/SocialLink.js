import mongoose from "mongoose";

const SocialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },   // Instagram, Facebook...
    username: { type: String, required: true },   // @twistandknot
    icon: { type: String, required: true },       // instagram, youtube...
    url: { type: String, required: false },       // optional
  },
  { timestamps: true }
);

export default mongoose.models.SocialLink ||
  mongoose.model("SocialLink", SocialLinkSchema);