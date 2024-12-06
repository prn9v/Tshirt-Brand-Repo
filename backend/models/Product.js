const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productSizes: { type: [String], required: true },
  productColors: { type: [String], required: true },
  productPrice: { type: Number, required: true },
  productDiscount: { type: Number },
  productFinalPrice: { type: Number, required: true },
  productDescription: { type: String, required: true },
  productGender: { type: String, required: true },
  productType: { type: String, required: true },
  productImage: { 
      data: Buffer, 
      contentType: String 
  },
});

module.exports = mongoose.model('Product', productSchema);
