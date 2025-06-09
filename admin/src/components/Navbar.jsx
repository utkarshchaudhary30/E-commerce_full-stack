import React from 'react';
import { assets } from "../assets/assets.js";
import { FiLogOut } from 'react-icons/fi';

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center justify-between py-4 px-6 bg-white border-b border-gray-100 shadow-sm'>
      <img 
        className='w-[120px] h-auto object-contain' 
        src={assets.logo} 
        alt="Company Logo" 
      />
      
      <button 
        onClick={() => setToken('')}
        className='flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-sm'
      >
        <FiLogOut className="text-sm" />
        <span className='text-sm font-medium'>Logout</span>
      </button>
    </div>
  );
};

export default Navbar;