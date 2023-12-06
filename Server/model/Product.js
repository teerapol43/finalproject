const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    id: {
      type: Number,
    },
    name: String,
    detail: {
      type: String,
    },
    file: {
      type: String,
      default: 'noimage.jpg'
    },
    price: {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
