import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Logo", logoSchema);
