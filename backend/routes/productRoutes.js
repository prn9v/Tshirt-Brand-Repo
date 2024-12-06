const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');

// Configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Folder to store images
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   },
// });

// const upload = multer({ storage });
// module.exports = upload;
  // API endpoint to handle product creation
// upload.single('productImage'),
 router.post('/add-product/direct', async (req, res) => {
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

        const product = new Product({
            productName,
            productDescription,
            productPrice: parseFloat(productPrice),
            productSizes: productSizes.split(',').map((size) => size.trim()),
            productColors: productColors.split(',').map((color) => color.trim()),
            // productImage: {
            //     data: fs.readFileSync(req.file.path),
            //     contentType: req.file.mimetype,
            // },
            productDiscount: parseFloat(productDiscount),
            productFinalPrice: parseFloat(productFinalPrice),
            productGender,
            productType,
        });

        await product.save();
        fs.unlinkSync(req.file.path);

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        console.error(err);
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
        // const response = products.map((product) => ({
        //     ...product._doc,
        //     productImage: `data:${product.productImage.contentType};base64,${product.productImage.data.toString(
        //         'base64'
        //     )}`,
        // }));
        const response = products;

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

        // const response = {
        //     ...product._doc,
        //     productImage: product.productImage
        //         ? `data:${product.productImage.contentType};base64,${product.productImage.data.toString('base64')}`
        //         : null,
        // };

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
