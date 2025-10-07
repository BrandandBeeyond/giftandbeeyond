const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  subcategoryname: {
    type: String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Subcategory ||
  mongoose.model("Subcategory", SubCategorySchema);
