import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { FiTrash2 } from 'react-icons/fi';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    // if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Inventory</h1>
        <div className="text-sm text-gray-500">
          {list.length} {list.length === 1 ? 'product' : 'products'} found
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 p-4 border-b text-sm font-medium text-gray-600 uppercase tracking-wider">
            <div className="col-span-1">Image</div>
            <div className="col-span-5">Product</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Subcategory</div>
            <div className="col-span-1">Price</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {/* Product List */}
          {list.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No products found. Add some products to get started.
            </div>
          ) : (
            list.map((item) => (
              <div 
                key={item._id} 
                className="grid grid-cols-2 md:grid-cols-12 gap-4 items-center p-4 border-b hover:bg-gray-50 transition-colors"
              >
                {/* Image */}
                <div className="col-span-1">
                  <img 
                    className="w-12 h-12 rounded-md object-cover border" 
                    src={item.image[0]} 
                    alt={item.name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/48';
                    }}
                  />
                </div>

                {/* Product Name */}
                <div className="col-span-4 md:col-span-5">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                </div>

                {/* Category */}
                <div className="hidden md:block col-span-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {item.category}
                  </span>
                </div>

                {/* Subcategory */}
                <div className="hidden md:block col-span-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {item.subCategory}
                  </span>
                </div>

                {/* Price */}
                <div className="col-span-1 font-medium text-gray-900">
                  {currency}{item.price.toFixed(2)}
                </div>

                {/* Action */}
                <div className="col-span-1 flex justify-end">
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Mobile category info */}
      <div className="md:hidden mt-4 text-sm text-gray-500">
        Tap on a product to see more details
      </div>
    </div>
  );
};

export default List;