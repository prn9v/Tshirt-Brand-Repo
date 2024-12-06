const express = require('express');
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// API endpoint to handle product creation
router.post('/add-product/direct', upload.single('productImage'), async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productSizes,
      productColors,
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
      !productDiscount ||
      !productFinalPrice ||
      !productGender ||
      !productType
    ) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Validate file existence
    if (!req.file) {
      return res.status(400).json({ error: 'Product image is required' });
    }

    const product = new Product({
      productName,
      productDescription: productDescription || '', // Optional field
      productPrice: parseFloat(productPrice),
      productSizes: productSizes.split(',').map((size) => size.trim()),
      productColors: productColors.split(',').map((color) => color.trim()),
      productImage: {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      },
      productDiscount: parseFloat(productDiscount),
      productFinalPrice: parseFloat(productFinalPrice),
      productGender,
      productType,
    });

    await product.save();
    fs.unlinkSync(req.file.path); // Remove the file from uploads folder

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error(err);
    // Handle specific errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Duplicate Product ID detected' });
    }
    res.status(500).json({ error: 'An error occurred while creating the product' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const response = products.map((product) => ({
      ...product._doc,
      productImage: product.productImage
        ? `data:${product.productImage.contentType};base64,${product.productImage.data.toString('base64')}`
        : null,
    }));

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID
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
        ? `data:${product.productImage.contentType};base64,${product.productImage.data.toString('base64')}`
        : null,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
