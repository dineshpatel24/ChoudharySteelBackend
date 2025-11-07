import mongoose from "mongoose";


const newArrivelsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    altText: { type: String, required: true },
  },
  { timestamps: true }
);  

export default mongoose.model("NewArrivels", newArrivelsSchema);