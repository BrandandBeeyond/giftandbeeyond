const mongoose = require("mongoose");

const kitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  includes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  displayImage: {
    public_id: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Kit || mongoose.model("Kit", kitSchema);
