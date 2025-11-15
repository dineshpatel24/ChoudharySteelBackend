import mongoose from "mongoose";

const SocialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    username: { type: String, required: true },
    icon: { type: String, required: true },     
    url: { type: String, default: "" },

    customMessage: {
      type: String,
      default: "Hello! I want to enquire about your products.",
    },

    isVisible: {
      type: Boolean,
      default: true, // ⭐ NEW: allow showing/hiding links on frontend
    },
  },
  { timestamps: true }
);

export default mongoose.models.SocialLink ||
  mongoose.model("SocialLink", SocialLinkSchema);