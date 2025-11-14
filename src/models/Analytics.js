import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  visitors: { type: Number, default: 0 },
  productsViewed: { type: Number, default: 0 },
  searches: { type: Number, default: 0 },
  enquiries: { type: Number, default: 0 },
});

export default mongoose.model("Analytics", analyticsSchema);