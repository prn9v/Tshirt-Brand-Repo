import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products'; // Backend API URL

// Fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Add a new product (for admin use)
export const addProduct = async (productData) => {
    const API_URL = 'http://localhost:5000/api/products/add'; // Replace with your actual backend URL
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for FormData
      },
    };
    return await axios.post(API_URL, productData, config);
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};