import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api/productApi";
import { useNavigate } from 'react-router-dom';
import "./ProductCard.css";
import Loader from "./Loader";

const MenProduct = () => {
  const [sortBy, setSortBy] = useState("low-to-high");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products.");
      }
    };

    getProducts();
  }, []);

  const handleProductClick = (productId) => {
    const newUrl = `/products/${productId}`;
    navigate(newUrl); // Updates the URL dynamically
  };

  // Handle Sorting Change
  const handleSortChange = (e) => setSortBy(e.target.value);

  // Render
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!products.length) {
    return <Loader/>;
  }

  const firstSortProducts = [...products].filter((product) => product.productGender === 'Male' || product.productGender === 'Unisex');

   // Sort products based on the selected sort order
  const sortedProducts = [...firstSortProducts].sort((a, b) => {
    if (sortBy === "low-to-high") return a.productFinalPrice - b.productFinalPrice;
    if (sortBy === "high-to-low") return b.productFinalPrice - a.productFinalPrice;
    return 0;
  });

  return (
    <div className="min-h-screen bg-green-50 px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-green-800 text-center">
        Men's Products
      </h1>
      <div className="flex justify-end mb-6">
        <select
          className="border-2 border-green-300 rounded-full px-3 py-2 bg-white text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {sortedProducts.map((product) => (
          <div
            key={product.productId}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
            onClick={() => handleProductClick(product._id)}
          >
            <div className="relative">
{/*               <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-48 sm:h-56 object-cover"
              /> */}
              {product.productDiscount > 0 && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white px-2 py-1 m-2 rounded-md text-xs font-semibold">
                  {product.productDiscount}% OFF
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                {product.productName}
              </h2>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.productDescription}
              </p>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-lg sm:text-xl font-bold text-teal-500">
                    ₹{product.productFinalPrice.toFixed(2)}
                  </span>
                  {product.productDiscount > 0 && (
                    <span className="text-xs sm:text-sm text-red-400 line-through ml-2">
                      ₹{product.productPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-600">
                  {product.productGender} / {product.productType}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.productSizes.map((size) => (
                  <span key={size} className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
                    {size}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.productColors.map((color) => (
                  <span
                    key={color}
                    className="w-5 h-5 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  ></span>
                ))}
              </div>
              <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm sm:text-base">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenProduct;
