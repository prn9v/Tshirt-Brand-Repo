import axios from 'axios';
// 'https://aeshthreets-api.onrender.com/api/products' ||
const API_URL = 'http://localhost:5000/api/products'; // Backend API URL

// Add a new product (for admin use)
export const addProduct = async (productData) => {
    const API = `${API_URL}/add`; // Replace with your actual backend URL
    const config = {
    headers: {
      'Content-Type': 'multipart/form-data', // Important for FormData
    },
  };

  try {
    console.log('Sending product data to backend:', productData);

    const response = await axios.post(API, productData, config);

    console.log('Product successfully added:', response.data);
    return response.data; // Return the server's response
  } catch (error) {
    console.error('Error adding product:', error.response?.data || error.message);

    // Optionally rethrow the error to handle it further in the caller
    throw error;
  }
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
