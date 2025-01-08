import React from 'react';

const CorouselItem = ({ image, title }) => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <img 
          className="w-[10rem] h-[10rem] lg:h-[14rem] lg:w-[14rem] 
            rounded-full object-cover object-center transition-transform transform hover:scale-110" 
          src={image} 
          alt={title} 
        />
        <span className='py-5 font-semibold text-xl text-gray-400'>{title}</span>
    </div>
  );
}

export default CorouselItem;

