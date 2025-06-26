const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  color: {
    type: String,
  },
  gender: {
    type: String,
  },
  category: {
    type: String,
  },
  quantity: {
    type: String,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
