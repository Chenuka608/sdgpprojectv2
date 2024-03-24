import React from 'react';
import laptopImage from '../images/backgroundimg.jpg';
import LaptopVid from '../images/backgroundvid.mp4'

const dmSerifText = {
  fontFamily: '"DM Serif Text", serif',
};

const poppins = {
  fontFamily: '"Poppins", sans-serif',
};

const Hero = () => {
  return (
    <div className='relative w-full h-screen'>
      {/* Background video */}
      <video className='absolute top-0 left-0 w-full h-full object-cover' autoPlay loop muted>
        <source src={LaptopVid} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      {/* Overlay */}
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60'></div>
      
      {/* Content */}
      <div className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white' style={dmSerifText}>
        <p className='text-4xl'>Welcome To</p>
        <h1 className="text-4xl font-bold mb-4 md:text-9xl drop-shadow-2xl">INTERNOVA</h1>
        <p className='text-lg max-w-[600px] drop-shadow-2xl py-2 text-x1 mx-auto' style={poppins}>
          The Interns Innovation , Browse our site to discover what we have to offer and schedule an introductory 
           session today .
        </p>
        <button className='bg-white text-black hover:bg-gray-300 hover:text-black transition-colors duration-300 ease-in-out  py-2 px-4 md:py-2md:px-4'>  Enroll Now</button>
      </div>
    </div>
  );
}

export default Hero;