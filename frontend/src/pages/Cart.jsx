import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, getCartAmount, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size: size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-16 bg-gray-50 min-h-screen">
      <div className="text-3xl md:text-4xl mb-12 text-center">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="max-w-5xl mx-auto px-4">
        {cartData.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-12">
            <p>Your cart is empty.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartData.map((item, index) => {
                const productData = products.find(product => product._id === item._id);
                if (!productData) return null;

                return (
                  <div
                    key={index}
                    className="py-6 border-t border-b border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 px-6"
                  >
                    <div className="flex items-start gap-6 flex-1">
                      <img
                        className="w-20 sm:w-24 rounded-md object-cover"
                        src={productData.image[0]}
                        alt={productData.name}
                      />
                      <div className="flex-1">
                        <p className="text-lg sm:text-xl font-semibold text-gray-900">{productData.name}</p>
                        <div className="flex items-center gap-4 mt-2 text-base text-gray-600">
                          <p className="font-medium">{currency}{productData.price}</p>
                          <p className="px-3 py-1 bg-gray-100 rounded-md text-sm">Size: {item.size}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        onChange={(e) =>
                          e.target.value === '' || e.target.value === '0'
                            ? null
                            : updateQuantity(item._id, item.size, Number(e.target.value))
                        }
                        className="border border-gray-300 rounded-md w-16 px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                      />
                      <img
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="w-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200"
                        src={assets.bin_icon}
                        alt="Remove"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end my-20">
              <div className="w-full sm:w-[450px] bg-white rounded-lg shadow-sm p-6">
                <CartTotal />
                <div className="w-full text-end mt-6">
                  <button
                    onClick={() => navigate('/place-order')}
                    className="bg-gray-900 text-white text-sm px-8 py-3 rounded-md hover:bg-gray-800 transition-colors duration-300"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;