const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { 
        type: String, 
        required: [true, "Product name is required"] 
    },
    productDescription: { 
        type: String 
    },
    productPrice: { 
        type: Number, 
        required: [true, "Product price is required"],
        min: [0, "Product price must be a positive number"]
    },
    productSizes: { 
        type: [String], 
        required: [true, "Product sizes are required"],
        validate: {
            validator: (sizes) => sizes.length > 0,
            message: "At least one size must be provided"
        }
    }, // Example: ['S', 'M', 'L', 'XL']
    productColors: { 
        type: [String], 
        required: [true, "Product colors are required"],
        validate: {
            validator: (colors) => colors.length > 0,
            message: "At least one color must be provided"
        }
    }, // Example: ['red', 'blue', 'green']
    productImage: { 
        data: Buffer, 
        contentType: String 
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId for MongoDB consistency
        required: [true, "Product ID is required"],
        unique: true // Ensures no duplicate IDs are created
    },
    productDiscount: { 
        type: Number, 
        required: [true, "Product discount is required"],
        min: [0, "Product discount must be a positive number"]
    },
    productFinalPrice: { 
        type: Number, 
        required: [true, "Product final price is required"],
        min: [0, "Product final price must be a positive number"]
    },
    productGender: { 
        type: String, 
        required: [true, "Product gender is required"],
        enum: ["Male", "Female", "Unisex"], // Optional: restrict values
        default: "Unisex"
    },
    productType: { 
        type: String, 
        required: [true, "Product type is required"]
    },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
