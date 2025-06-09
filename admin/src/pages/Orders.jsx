import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
 const statusHandler=async(event,orderId)=>{
       try {
          const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {orderId,status:event.target.value},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        
      );
      if(response.data.success){
         await fetchAllOrders();
      }
       } catch (error) {
          console.log(error);
          toast.error(response.data.message)
       }
 }
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">My Orders</h3>
      
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="p-5 border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <img className="w-10 h-10 object-contain" src={assets.parcel_icon} alt="Order" />
                  <div>
                    <p className="text-sm text-gray-500">Order #{order._id?.slice(-8) || index}</p>
                    <p className="text-sm font-medium">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{currency}{order.amount}</p>
                  <p className={`text-sm ${order.payment ? 'text-green-600' : 'text-yellow-600'}`}>
                    {order.payment ? "Paid" : "Payment Pending"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Items</h4>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <p className="text-gray-800">
                        {item.name} <span className="text-gray-500">({item.size})</span>
                      </p>
                      <p className="text-gray-600">
                        {item.quantity} × {currency}{item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-3">Shipping Details</h4>
                <div className="space-y-1 text-gray-600">
                  <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state}</p>
                  <p>{order.address.country}, {order.address.zipcode}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-3">Order Status</h4>
                <select  onChange={(event)=>statusHandler(event,order._id)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={order.status || "Order Placed"}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <div className="mt-4 space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500">Payment Method:</span> {order.paymentMethod}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Items:</span> {order.items.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;