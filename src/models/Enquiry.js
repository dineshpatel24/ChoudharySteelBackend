import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  productName: String,
  productId: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Enquiry", enquirySchema);