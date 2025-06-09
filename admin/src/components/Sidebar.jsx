import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FiPlus, FiList, FiShoppingBag } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className='w-56 min-h-screen bg-white border-r border-gray-200 shadow-sm'>
      <div className='flex flex-col gap-1 p-4'>
        <NavLink 
          to="/add"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              isActive ? 'bg-blue-50 text-blue-600 font-medium' : ''
            }`
          }
        >
          <FiPlus className='w-5 h-5' />
          <span>Add Items</span>
        </NavLink>
        
        <NavLink 
          to="/list"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              isActive ? 'bg-blue-50 text-blue-600 font-medium' : ''
            }`
          }
        >
          <FiList className='w-5 h-5' />
          <span>List Items</span>
        </NavLink>
        
        <NavLink 
          to="/orders"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              isActive ? 'bg-blue-50 text-blue-600 font-medium' : ''
            }`
          }
        >
          <FiShoppingBag className='w-5 h-5' />
          <span>Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;