// components/LoadingBubbles.jsx
import React from 'react';

const LoadingBubble = () => {
  return (
      <div className="flex justify-center items-center space-x-2 h-full">
        <div className=''>Loading...</div>
      <div className="animate-bounce bg-blue-500 h-4 w-4 rounded-full"></div>
      <div className="animate-bounce bg-blue-500 h-4 w-4 rounded-full animation-delay-200"></div>
      <div className="animate-bounce bg-blue-500 h-4 w-4 rounded-full animation-delay-400"></div>
    </div>
  );
};

export default LoadingBubble;
