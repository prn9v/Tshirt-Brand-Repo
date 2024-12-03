const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productDescription: { type: String },
    productPrice: { type: Number, required: true },
    productSizes: { type: [String], required: true }, // Example: ['S', 'M', 'L', 'XL']
    productColors: { type: [String], required: true }, // Example: ['red', 'blue', 'green']
    productImage: { data: Buffer, contentType: String }, // URL for the product image
    productId: {type: Number,required: true},
    productDiscount: {type: Number,required: true},
    productFinalPrice: {type: Number,required: true},
    productGender: { type: String, required: true},
    productType: {type: String, required: true},
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
