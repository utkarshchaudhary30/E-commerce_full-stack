import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const {backendUrl,token,currency}=useContext(ShopContext);
  const [orderData,setOrderData]=useState([]);
  
  const loadOrderData=async ()=>{
      try {
        if(!token){
           return null;
        }
        const response=await axios.post(backendUrl+'/api/order/userOrders',{},{headers:{token}})
        if(response.data.success){
            let allorderItems=[];
            response.data.orders.map((order)=>{
              order.items.map((item)=>{
                item['status']=order.status;
                item['payment']=order.payment;
                item['paymentMethod']=order.paymentMethod;
                item['date']=order.date;
                allorderItems.push(item)
              })
            })
            setOrderData(allorderItems.reverse());
        }
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(()=>{
     loadOrderData();
  },[token])

  return (
    <div className='border-t pt-16 bg-gray-50 min-h-screen'>
      <div className='text-3xl md:text-4xl mb-12 text-center'>
        <Title text1={'MY'} text2={' ORDERS'}/>
      </div>
      <div className='max-w-5xl mx-auto px-4'>
        {orderData.length === 0 ? (
          <div className='text-center text-gray-500 text-lg py-12'>
            <p>No orders found.</p>
          </div>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className='py-6 border-t border-b border-gray-200 text-gray-800 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 px-6'
            >
              <div className='flex items-start gap-6'>
                <img
                  className='w-20 sm:w-24 rounded-md object-cover'
                  src={item.image[0]}
                  alt={item.name}
                />
                <div className='flex-1'>
                  <p className='text-lg sm:text-xl font-semibold text-gray-900'>{item.name}</p>
                  <div className='flex items-center gap-4 mt-2 text-base text-gray-600'>
                    <p className='font-medium'>{currency}{item.price}</p>
                    <p>Quantity: <span className='font-medium'>{item.quantity}</span></p>
                    <p>Size: <span className='font-medium'>{item.size}</span></p>
                  </div>
                  <p className='mt-2 text-sm'>
                    Date: <span className='text-gray-500'>{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className='mt-1 text-sm'>
                    Payment: <span className='text-gray-500'>{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className='md:w-1/3 flex items-center justify-between gap-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-3 h-3 rounded-full bg-green-500'></div>
                  <p className='text-sm md:text-base font-medium text-gray-700'>{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className='border border-gray-300 bg-gray-900 text-white px-5 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200'
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders