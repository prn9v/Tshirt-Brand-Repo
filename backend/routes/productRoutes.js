const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });
  // API endpoint to handle product creation

router.post('/add', upload.single('productImage'), async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    try {
        const { _id, ...productData } = req.body;

        if (_id) {
            return res.status(400).json({ error: "Do not include '_id' in the request" });
        }

        const product = new Product({
            productName: productData.productName,
            productDescription: productData.productDescription,
            productType: productData.productType,
            productPrice: productData.productPrice,
            productDiscount: productData.productDiscount,
            productFinalPrice: productData.productFinalPrice,
            productGender: productData.productGender,
            productSizes: productData.productSizes.split(','), // Ensure data is comma-separated
            productColors: productData.productColors.split(','),
            productImage: {
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype,
            },
        });

        // Save product to database
        await product.save();

        // Optionally delete the uploaded file
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        console.log('Saved Product:', product);

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        console.error('Error:', err);
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
