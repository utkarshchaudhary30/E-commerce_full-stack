import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod': {
          const response = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case 'stripe': {
          const responseStripe = await axios.post(
            backendUrl + '/api/order/stripe',
            orderData,
            { headers: { token } }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }

        case 'razorpay': {
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
          if (responseRazorpay.data.success) {
            console.log(responseRazorpay.data.order);
          }
          else {
            console.log(error);
            toast.error(responseRazorpay.response.message)
          }
          break;
        }

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row">
          {/* Left Column - Delivery Information */}
          <div className="w-full lg:w-1/2 p-8 border-r border-gray-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Delivery Information</h2>
              <p className="text-gray-600">Please enter your details for order delivery</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    required
                    onChange={onChangeHandler}
                    name="firstName"
                    value={formData.firstName}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    required
                    onChange={onChangeHandler}
                    name="lastName"
                    value={formData.lastName}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="email"
                  value={formData.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  type="email"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="street"
                  value={formData.street}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  type="text"
                  placeholder="Street Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    required
                    onChange={onChangeHandler}
                    name="city"
                    value={formData.city}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="text"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    required
                    onChange={onChangeHandler}
                    name="state"
                    value={formData.state}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="text"
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <input
                    required
                    onChange={onChangeHandler}
                    name="zipcode"
                    value={formData.zipcode}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="number"
                    placeholder="Zipcode"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    required
                    onChange={onChangeHandler}
                    name="country"
                    value={formData.country}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="text"
                    placeholder="Country"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="phone"
                  value={formData.phone}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  type="number"
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-1/2 p-8 bg-gray-50">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Summary</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <CartTotal />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Method</h2>
              <div className="space-y-3">
                <div
                  onClick={() => setMethod('stripe')}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${method === 'stripe' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${method === 'stripe' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                    {method === 'stripe' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <img className="h-6" src={assets.stripe_logo} alt="Stripe" />
                </div>

                <div
                  onClick={() => setMethod('cod')}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${method === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${method === 'cod' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                    {method === 'cod' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive your order</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition shadow-md hover:shadow-lg"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder