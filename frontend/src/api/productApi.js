import axios from 'axios';

const API_URL = 'https://aeshthreets-api.onrender.com/api/products'; // Backend API URL

// Add a new product (for admin use)
export const addProduct = async (productData) => {
    const API_URL = 'https://aeshthreets-api.onrender.com/api/products/add'; // Replace with your actual backend URL
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for FormData
      },
    };
    return await axios.post(API_URL, productData, config);
};

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

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
