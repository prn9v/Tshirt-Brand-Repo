import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productApi';
import { useNavigate } from 'react-router-dom';
import "./ProductCard.css";
import Loader from './Loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [filterGender, setFilterGender] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, []);

  if (!products.length) {
    return <Loader/>;
  }

  const sortedAndFilteredProducts = products
    .filter(
      (product) =>
        filterGender === 'all' || filterGender === product.productGender  
    )
    .filter(
      (product) =>
        filterType === 'all' || filterType === product.productType 
    )
    .sort((a, b) => {
      if (sortBy === 'price') return a.productFinalPrice - b.productFinalPrice;
      return a.productName.localeCompare(b.productName);
    });

    const handleProductClick = (productId) => {
      const newUrl = `/products/${productId}`;
      navigate(newUrl); // Updates the URL dynamically
    };

    return (
      <div className="min-h-screen bg-green-50 px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-green-800 text-center">
          Our Products
        </h1>
        <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <select
            className="w-full sm:w-auto border-2 border-green-300 rounded-full px-4 py-2 bg-white text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Sort by Price</option>
            <option value="name">Sort by Name</option>
          </select>
          <select
            className="w-full sm:w-auto border-2 border-green-300 rounded-full px-4 py-2 bg-white text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
          >
            <option value="all">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
          <select
            className="w-full sm:w-auto border-2 border-green-300 rounded-full px-4 py-2 bg-white text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Graphic">Graphic</option>
            <option value="Plain">Plain</option>
            <option value="Vintage">Vintage</option>
          </select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {sortedAndFilteredProducts.map((product) => (
            <div
              key={product.productId}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              <div className="relative">
{/*                 <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-48 sm:h-56 object-cover"
                /> */}
                {product.productDiscount > 0 && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                    {product.productDiscount}% OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                  {product.productName}
                </h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.productDescription}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-xl font-bold text-teal-500">
                      ₹{product.productFinalPrice.toFixed(2)}
                    </span>
                    {product.productDiscount > 0 && (
                      <span className="text-xs text-red-400 line-through ml-2">
                        ₹{product.productPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-medium text-gray-600">
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
                <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Products;
