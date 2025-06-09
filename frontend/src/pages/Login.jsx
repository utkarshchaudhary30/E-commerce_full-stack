import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('signup');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'signup') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Signup successful!');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred, please try again.');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 sm:p-10 space-y-8 transform transition-all duration-500 hover:shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
            {currentState === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <div className="mt-2 flex justify-center">
            <hr className="w-16 h-1 bg-gray-800 rounded-full" />
          </div>
          <p className="mt-3 text-sm text-gray-500">
            {currentState === 'login' ? 'Sign in to your account' : 'Join us today'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          {currentState === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                id="name"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <p className="text-gray-600 hover:text-gray-800 cursor-pointer transition-colors duration-200">
              Forgot your password?
            </p>
            <p
              onClick={() => setCurrentState(currentState === 'login' ? 'signup' : 'login')}
              className="text-gray-600 hover:text-gray-800 cursor-pointer font-medium transition-colors duration-200"
            >
              {currentState === 'login' ? 'Create an account' : 'Already have an account? Login'}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium text-base hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-all duration-300"
          >
            {currentState === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            By {currentState === 'login' ? 'signing in' : 'signing up'}, you agree to our{' '}
            <span className="underline hover:text-gray-700 cursor-pointer">Terms</span> and{' '}
            <span className="underline hover:text-gray-700 cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;