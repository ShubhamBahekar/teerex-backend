
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: String,
  price: Number,
  image: String,
  quantity: Number,
  count: Number,
  category: String,
  color: String,
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // ✅ We want only one cart per user
  },
  items: [cartItemSchema], // ✅ Array of products
});

const cartModel = mongoose.model("Cart", cartSchema);
module.exports = cartModel;
