import React from 'react';
import { useNavigate } from 'react-router-dom';

const Plan = () => {
  const navigate = useNavigate(); // Assign the navigate function
  
  const navigateToSubscription = () => {
    navigate('/subscription'); // Navigate to the subscription page
  };

  return (
    <div className='max-w-[1400px] m-auto py-16 px-4 grid lg:grid-cols-2 gap-4'>
      {/* Left Side */}
      <div className='grid grid-cols-2 grid-rows-6 h-[80vh]'>
        <img
          className='row-span-3 object-cover w-full h-full p-2'
          src='https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='/'
        />
        <img
          className='row-span-2 object-cover w-full h-full p-2'
          src='https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='/'
        />
        <img
          className='row-span-2 object-cover w-full h-full p-2'
          src='https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='/'
        />
        <img
          className='row-span-3 object-cover w-full h-full p-2'
          src='https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='/'
        />
        <img
          className='row-span-2 object-cover w-full h-full p-2'
          src='https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=600'
          alt='/'
        />
      </div>
      {/* Right Side */}
      <div className='flex flex-col h-full justify-center'>
        <h3 className='text-5xl md:text-6xl font-bold'>You can Shape your own Future!</h3>
        <p className='text-2xl py-6'>
          Struggling to prepare for your interviews? At Internova, we understand these challenges.
        </p>
        <p className='pb-6'>
          That's why we've tailored a comprehensive course designed to equip you with the skills and confidence needed to ace your next interview with ease. Our program is crafted to alleviate stress and instill confidence, empowering you to tackle even the toughest interview questions with poise and precision. With personalized guidance and practical exercises, we'll help you hone your interview skills and present your best self to prospective employers. Join us at Internova and embark on your journey to interview success with confidence and ease.
        </p>
        <div>
          <button className='bg-black text-white border-black hover:shadow-xl py-2 px-4 md:py-2 md:px-4' onClick={navigateToSubscription}>
            View Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plan;
