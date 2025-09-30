import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  hexCode: {
    type: String, 
  },
});

export default mongoose.models.Color || mongoose.model("Color", ColorSchema);
