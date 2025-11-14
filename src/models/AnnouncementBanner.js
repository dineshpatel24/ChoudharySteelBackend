import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },      // The announcement text
    bgColor: { type: String, default: "#FFD700" },  // Background color
    textColor: { type: String, default: "#000000" },// Text color
    isActive: { type: Boolean, default: true },     // Show/Hide banner
    startDate: { type: Date, default: null },       // Optional
    endDate: { type: Date, default: null },         // Optional
  },
  { timestamps: true }
);

export default mongoose.model("AnnouncementBanner", announcementSchema);