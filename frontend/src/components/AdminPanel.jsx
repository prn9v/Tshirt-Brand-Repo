import React, { useState } from 'react';
import { addProduct } from '../api/productApi';

const AdminPage = () => {
  const [product, setProduct] = useState({
      productName: '',
      productImage: null,
      productSizes: [],
      productPrice: '',
      productDiscount: '',
      productFinalPrice: '',
      productDescription: '',
      productColors: [],
      productGender: '',
      productType: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        name === 'productSizes' || name === 'productColors'
          ? value.split(',').map((item) => item.trim()) // Convert comma-separated values to arrays
          : name === 'productImage'
          ? files[0] // Store file object
          : value, // Update other fields
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Add product data to FormData
    formData.append('productName', product.productName);
    formData.append('productImage', product.productImage); // Append the image file
    formData.append('productSizes', product.productSizes.join(',')); // Convert to comma-separated string
    formData.append('productColors', product.productColors.join(',')); // Convert to comma-separated string
    formData.append('productPrice', product.productPrice);
    formData.append('productType', product.productType);
    formData.append('productGender', product.productGender);
    formData.append('productDiscount', product.productDiscount);
    formData.append('productFinalPrice', product.productFinalPrice);
    formData.append('productDescription', product.productDescription);

    // Debugging: Log form data
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      await addProduct(formData);
      alert('Product added successfully!');
      console.log('Product added is: ', product)
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }

    // Reset form state
    setProduct({
      productName: '',
      productImage: null,
      productSizes: [],
      productPrice: '',
      productDiscount: '',
      productFinalPrice: '',
      productDescription: '',
      productColors: [],
      productGender: '',
      productType: '',
    });
  };

  return (
    <div className="min-h-screen bg-green-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl px-4 py-10 sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h2 className="text-center text-3xl font-extrabold text-green-900 mb-6">
                Add New T-Shirt Product
              </h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="rounded-md shadow-sm -space-y-px">
                {['productName', 'productType', 'productPrice', 'productDiscount', 'productFinalPrice'].map((field) => (
                  <div key={field} className="mb-4">
                    <label htmlFor={field} className="sr-only">
                      {field.charAt(0).toUpperCase() + field.slice(1).replace('product', '')}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field.includes('Price') || field.includes('Discount') ? 'number' : 'text'}
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('product', '')}
                      value={product[field]}
                      onChange={handleChange}
                      step={field.includes('Price') ? '0.01' : field.includes('Discount') ? '1' : undefined}
                      min={field.includes('Discount') ? '0' : undefined}
                      max={field.includes('Discount') ? '100' : undefined}
                    />
                  </div>
                ))}
                <div className="mb-4">
                  <label htmlFor="productImage" className="block text-sm font-medium text-green-700 mb-2">
                    Product Image
                  </label>
                  <input
                    id="productImage"
                    name="productImage"
                    type="file"
                    required
                    accept="image/*"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="productSizes" className="block text-sm font-medium text-green-700 mb-2">
                    Product Sizes (comma-separated)
                  </label>
                  <input
                    id="productSizes"
                    name="productSizes"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="S, M, L, XL"
                    value={product.productSizes.join(', ')}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="productColors" className="block text-sm font-medium text-green-700 mb-2">
                    Product Colors (comma-separated)
                  </label>
                  <input
                    id="productColors"
                    name="productColors"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Red, Blue, Green"
                    value={product.productColors.join(', ')}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Product Gender
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {['Male', 'Female', 'Unisex'].map((gender) => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="radio"
                          name="productGender"
                          value={gender}
                          checked={product.productGender === gender}
                          onChange={handleChange}
                          className="h-4 w-4 text-green-600 border-green-300 focus:ring-green-500"
                        />
                        <span className="ml-2 text-green-900">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="productDescription" className="block text-sm font-medium text-green-700 mb-2">
                    Product Description
                  </label>
                  <textarea
                    id="productDescription"
                    name="productDescription"
                    rows="3"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Describe the product..."
                    value={product.productDescription}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
