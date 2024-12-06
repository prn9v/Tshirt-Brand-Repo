const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors({
    origin: 'https://aeshthreets-tshirts.onrender.com', // Use env variable for frontend URL
}));

// MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MongoDB connection string (MONGO_URI) is not defined in environment variables.');
    process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process on critical error
    });

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Serve Static Files for Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root Route
app.get('/', (req, res) => {
    res.status(200).send({
        message: "Welcome to the E-commerce API - Node.js",
        status: true,
    });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
