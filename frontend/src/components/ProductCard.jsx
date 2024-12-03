import React, { useEffect, useState } from 'react';
import { fetchProductById } from '../api/productApi';
import { useParams } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import Loader from './Loader';

const ProductCard = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const styles = {
    alertBox: {
      position: "fixed",
      top: "20%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
      borderRadius: "8px",
      zIndex: 1000,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    alertText: {
      margin: 0,
      fontSize: "16px",
    },
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
        setSelectedColor(data.productColors[0]);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
      }
    };

    getProduct();
  }, [productId]);

  const redirectToInstagram = () => {
    setShowAlert(true); // Show the alert first
    const productLink =`${process.env.REACT_APP_BASE_URL}/products/${productId}`
  
    // Wait for 5 seconds to display the alert, then copy to clipboard
    setTimeout(() => {
      const message = `Hello! I want to buy the following product:\n\n` +
        `Product Link: ${productLink}\n` +
        `Size: ${selectedSize}\n` +
        `Color: ${selectedColor}\n` +
        `Quantity: ${quantity}\n\n` +
        `Please confirm my order.`;
  
      navigator.clipboard.writeText(message)
        .then(() => {
          setShowAlert(false); // Hide the alert after copying
          window.location.href = `https://www.instagram.com/aesthreets/?utm_source=ig_web_button_share_sheet`;
        })
        .catch((err) => {
          console.error("Failed to copy message: ", err);
          alert("Failed to copy the message. Please try again.");
        });
    }, 2500); // 2.5 seconds delay for showing the alert
  };

  if (error) {
    return <div className="text-red-600 text-center text-xl font-semibold mt-10">{error}</div>;
  }

  if (!product) {
    return <Loader/>
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-teal-50 py-6 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="relative h-64 sm:h-80 md:h-full">
                <img 
                  src={product.productImage} 
                  alt={product.productName} 
                  className="w-full h-full object-cover"
                />
                {product.productDiscount > 0 && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.productDiscount}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6 sm:p-8">
              <div className="mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{product.productName}</h1>
                <p className="text-sm sm:text-base text-gray-600">{product.productType} | {product.productGender}</p>
              </div>

              <div className="mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-teal-600">${product.productFinalPrice.toFixed(2)}</span>
                {product.productDiscount > 0 && (
                  <span className="ml-2 text-lg sm:text-xl text-red-400 line-through">${product.productPrice.toFixed(2)}</span>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Colors</h2>
                <div className="flex flex-wrap gap-2">
                  {product.productColors.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-teal-500 ring-2 ring-teal-300' : 'border-gray-300'}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      aria-label={`Select ${color} color`}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Size</h2>
                <div className="flex flex-wrap gap-2">
                  {product.productSizes.map(size => (
                    <button
                      key={size}
                      className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base ${
                        selectedSize === size 
                          ? 'bg-teal-500 text-white' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Quantity</h2>
                <div className="flex items-center space-x-3">
                  <button 
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <button 
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    onClick={() => setQuantity(prev => prev + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 flex items-center justify-center"
                onClick={redirectToInstagram}
              >
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                Buy Now
              </button>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
                <p className="text-sm sm:text-base text-gray-600">{product.productDescription}</p>
              </div>
            </div>
            {showAlert && (
              <div style={styles.alertBox}>
                <p style={styles.alertText}>
                  <b>Copied to clipboard!</b> <br />
                  Message me on Instagram.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 