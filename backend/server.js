const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
const allowedOrigins = [
    'http://localhost:3000',  // Development
    'https://aeshthreets-tshirts.onrender.com',  // Production
];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) { // Allow server-side requests too
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

// MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://pranavdeshmukh5454:5DUxv2OyPWWdBAwk@cluster0.4snwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));


// Static Files for Uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log('Uploads folder created!');
}

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);



app.use('/uploads', express.static(uploadsDir));

// Root Route
app.get('/', (req, res) => {
    res.status(200).send({
        message: "Welcome to the E-commerce API - Node.js",
        status: true
    });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
