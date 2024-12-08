const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
  router.post('/add', upload.single('productImage'), async(req, res) => {
    try {
      const { _id, ...productData } = req.body;
        if (_id) {
            return res.status(400).json({ error: "Do not include '_id' in the request" });
        }
      const product = new Product({
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productSizes: req.body.productSizes.split(","), // Assuming sizes are sent as a comma-separated string
        productColors: req.body.productColors.split(","), // Assuming colors are sent as a comma-separated string
        productImage: {
          data: fs.readFileSync(req.file.path),
          contentType: req.file.mimetype,
        },
        productDiscount: req.body.productDiscount,
        productFinalPrice: req.body.productFinalPrice,
        productGender: req.body.productGender, // Assuming genders are sent as a comma-separated string
        productType: req.body.productType,
      });
  
      await product.save();
  
      // Optionally, delete the uploaded file from the server
      fs.unlinkSync(req.file.path);
  
      res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
      res.status(500).json({ error: err.message });
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
