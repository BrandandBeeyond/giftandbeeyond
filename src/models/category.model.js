const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
    required: true,
  },
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
  ],
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
