const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });
module.exports = upload;
  // API endpoint to handle product creation
  router.post('/add-product', upload.single('productImage'), async (req, res) => {
  try {
    // Extract fields from the request body
    const {
      productName,
      productDescription,
      productPrice,
      productSizes,
      productColors,
      productId,
      productDiscount,
      productFinalPrice,
      productGender,
      productType,
    } = req.body;

    // Validate required fields
    if (
      !productName ||
      !productPrice ||
      !productSizes ||
      !productColors ||
      !productId ||
      !productDiscount ||
      !productFinalPrice ||
      !productGender ||
      !productType
    ) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Validate `productId` (ObjectId check if using MongoDB ObjectId for productId)
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ error: 'Invalid Product ID format' });
    }

    // Validate uploaded image
    if (!req.file) {
      return res.status(400).json({ error: 'Product image is required' });
    }

    // Create a new product instance
    const product = new Product({
      productName,
      productDescription,
      productPrice: parseFloat(productPrice), // Ensure number format
      productSizes: productSizes.split(',').map((size) => size.trim()), // Convert to array
      productColors: productColors.split(',').map((color) => color.trim()), // Convert to array
      productImage: {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      },
      productId, // Ensure unique product ID
      productDiscount: parseFloat(productDiscount),
      productFinalPrice: parseFloat(productFinalPrice),
      productGender, // Gender as a string
      productType,
    });

    // Save the product to the database
    await product.save();

    // Optionally remove the uploaded file after saving the product
    fs.unlinkSync(req.file.path);

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error(err);

    // Handle validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }

    // Handle duplicate key errors (e.g., unique constraint violations)
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Duplicate Product ID detected' });
    }

    res.status(500).json({ error: 'An error occurred while creating the product' });
  }
});

// Get all products (Customer view)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const response = products.map((product) => ({
      ...product._doc,
      productImage: `data:${product.productImage.contentType};base64,${product.productImage.data.toString(
        "base64"
      )}`,
    }));

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const response = {
      ...product._doc,
      productImage: product.productImage
        ? `data:${product.productImage.contentType};base64,${product.productImage.data.toString("base64")}`
        : null,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
