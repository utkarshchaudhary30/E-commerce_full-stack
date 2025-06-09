import React from 'react';

const NewsletterBox = () => {
    const onSubmitHandler=(event)=>{
           event.preventDefault();
    }
  return (
    <div className='text-center px-4 py-8'>
      <p className='text-2xl font-semibold text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-500 mt-2 max-w-lg mx-auto text-sm'>
        Sign up for our newsletter and be the first to know about exclusive offers, new arrivals, and more.
      </p>

      <form onSubmit={onSubmitHandler}className='w-full sm:w-1/2 mx-auto mt-6 flex flex-col sm:flex-row items-center gap-3'>
        <input
          className='w-full flex-1 px-4 py-3 border border-gray-300 rounded-md outline-none text-sm'
          type='email'
          placeholder='Enter your email'
          required
        />
        <button
          type='submit'
          className='bg-black text-white text-xs font-medium px-6 py-3 rounded-md hover:bg-gray-800 transition-all'
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
