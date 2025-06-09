import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={' US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            At Forever, we believe shopping should be more than just a transaction—it should be a joyful, seamless, and memorable experience. Our mission is to bring you a curated selection of quality products across fashion, lifestyle, and home essentials, all while staying affordable and stylish.
          </p>

          <p>
            From trendsetters to minimalists, Forever caters to every personality with thoughtfully sourced items and a customer-first approach. We’re not just building a store—we’re building a community. Join us and discover what it means to shop with purpose, ease, and style.
          </p>

          <b className='text-gray-800'>Our Mission</b>
          <p>
            To redefine online shopping by delivering exceptional value, trend-driven collections, and a personalized experience that empowers customers to express their unique identity with confidence.
          </p>
        </div>
      </div>
      <div className='text-2xl py-4'>
        <Title text1={'WHY'} text2={' CHOOSE US'}/>
         
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
  <b className='text-lg'>Quality Assurance:</b>
  <p className='text-gray-600'>
    We partner only with trusted vendors and meticulously inspect every product to ensure it meets our high standards. From materials to packaging, quality is never compromised—because you deserve nothing less than excellence.
  </p>
</div>

<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
  <b className='text-lg'>Convenience:</b>
  <p className='text-gray-600'>
    Forever is designed for modern life. With a user-friendly interface, secure payment options, and quick delivery, we ensure that shopping is smooth, intuitive, and accessible—anytime, anywhere.
  </p>
</div>

<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
  <b className='text-lg'>Exceptional Customer Service</b>
  <p className='text-gray-600'>
    Our support doesn’t end at checkout. Whether you need help with an order or just have a question, our dedicated customer care team is here to assist you—promptly, politely, and professionally.
  </p>
</div>

      </div>
       <NewsletterBox/>
    </div>
  );
};

export default About;
