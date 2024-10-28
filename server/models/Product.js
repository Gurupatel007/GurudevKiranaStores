const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  weight: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  prices: [priceSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);