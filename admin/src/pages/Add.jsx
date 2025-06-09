import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response.data.success){
          toast.success(response.data.message);
          setName('');
          setDescription('');
          setPrice('');
          setImage1(false);
          setImage2(false);
          setImage3(false);
          setImage4(false);
      } else {
          toast.error(response.error.message);
      }
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
      
      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Image Upload Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700 mb-3">Product Images</h2>
          <p className="text-sm text-gray-500 mb-4">Upload at least one image (max 4)</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[image1, image2, image3, image4].map((img, i) => (
              <label 
                key={i} 
                htmlFor={`image${i + 1}`}
                className={`border-2 ${!img ? 'border-dashed border-gray-300' : 'border-solid border-gray-200'} rounded-md overflow-hidden cursor-pointer hover:border-gray-400 transition-colors`}
              >
                <div className="aspect-square flex items-center justify-center bg-gray-100">
                  <img 
                    className="w-full h-full object-cover" 
                    src={!img ? assets.upload_area : URL.createObjectURL(img)} 
                    alt={img ? `Preview ${i + 1}` : 'Upload area'} 
                  />
                </div>
                <input 
                  type="file" 
                  hidden 
                  id={`image${i + 1}`} 
                  onChange={(e) => {
                    const setter = [setImage1, setImage2, setImage3, setImage4][i];
                    setter(e.target.files[0]);
                  }} 
                  accept="image/*"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Basic Information Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700">Basic Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product name</label>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              type="text" 
              placeholder="Enter product name" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product description</label>
            <textarea 
              onChange={(e) => setDescription(e.target.value)} 
              value={description} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]" 
              placeholder="Enter detailed product description" 
              required 
            />
          </div>
        </div>

        {/* Category and Pricing Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
            <select 
              onChange={(e) => setSubCategory(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input 
                onChange={(e) => setPrice(e.target.value)} 
                value={price} 
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                type="number" 
                placeholder="0.00" 
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        {/* Sizes Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  sizes.includes(size) 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller Section */}
        <div className="flex items-center">
          <input 
            onChange={() => setBestseller(prev => !prev)} 
            checked={bestseller} 
            type="checkbox" 
            id="bestseller" 
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="bestseller" className="ml-2 block text-sm text-gray-700">
            Mark as bestseller
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;