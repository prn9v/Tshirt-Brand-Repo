import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productApi';
import { useNavigate } from 'react-router-dom';
import "./ProductCard.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
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

  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleProductClick = (productId) => {
    const newUrl = `/products/${productId}`;
    navigate(newUrl); // Updates the URL dynamically
  };

  const randomItems = getRandomItems(products, 8);

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-green-500 overflow-hidden">
        <div className="min-w-10xl mx-auto">
          <div className="relative z-10 pb-8 bg-green-500 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Be Aesthetic</span>{' '}
                  <span className="block text-green-200 xl:inline">On Streets</span>
                </h1>
                <p className="mt-3 text-base text-green-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  UrbanThreads: Where style meets individuality. Redefine casual fashion and stay aesthetic on streets.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="/products"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 md:py-4 md:text-lg md:px-10"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
{/*           <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="/images/3.jpg"
            alt="T-shirt showcase"
          /> */}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold text-green-800 text-center mb-6 sm:text-4xl">Featured Products</h2>
          <div className="bg-gradient-to-br from-amber-50 to-teal-50 px-4 py-8 sm:px-6 sm:py-12 rounded-lg">
            <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {randomItems.map(product => (
                <div
                key={product.productId}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="relative">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
