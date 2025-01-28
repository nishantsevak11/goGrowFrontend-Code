import React, { useState, useEffect } from 'react';

const AboutSection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`flex flex-col md:flex-row lg:px-10`}> 
      {/* Changed to flex-col and added md:flex-row for responsive behavior */}
      <div className={`w-full md:w-1/2 p-4`}> 
        {/* Added p-4 for some basic padding */}
        <h3 className='text-xl lg:text-8xl md:text-4xl font-bold mb-2'>What Drives Us?</h3> 
        {/* Added font-bold for stronger heading */}
        <p className='text-lg'>At GoGrow, we believe that motivation is the spark that ignites greatness. Whether it's a push to start your day or a reminder to stay focused, we deliver just the inspiration you need, when you need it.</p>
      </div>
      <div className={`w-full md:w-1/2 p-4`}> 
        {/* Added p-4 for some basic padding */}
        <img src="./aboutImg.png" alt="" className='w-full object-cover rounded-3xl' /> 
        {/* Added w-full and object-cover for better image scaling */}
      </div>
    </div>
  );
}

export default AboutSection;