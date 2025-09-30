import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  productSku: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color',
    default: null,
  },
  images: [
    {
      type: String, 
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
