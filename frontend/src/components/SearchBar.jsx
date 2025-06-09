import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible,setVisible]=useState(false);
  const location = useLocation();

  useEffect(()=>{
         if(location.pathname.includes('collection')){
                setVisible(true);
         }
         else {
              setVisible(false);
         }
  },[location]);


  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center py-4'>
      <div className='inline-flex justify-center items-center border border-gray-400 px-5 py-2 mx-3 rounded-full w-11/12 sm:w-3/4 md:w-1/2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-transparent text-sm'
          type="text"
          placeholder='Search'
          aria-label='Search input'
        />
        <img
          className='w-4 ml-2'
          src={assets.search_icon}
          alt="Search icon"
        />
      </div>
      <button
        onClick={() => setShowSearch(false)}
        className='ml-2 p-1'
        aria-label='Close search bar'
      >
        <img
          className='w-3 inline cursor-pointer'
          src={assets.cross_icon}
          alt="Close"
        />
      </button>
    </div>
  ):null;
};

export default SearchBar;
