import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const LoadingPage = ({ setIsLoaded }) => {
  const [countdown, setCountDown] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountDown(prevCountdown => {
        if (prevCountdown >= 100) {
          clearInterval(intervalId); 
          setIsLoaded(true);
          return prevCountdown;
        }
        return prevCountdown + 1; 
      });
    }, 40);

    
    return () => clearInterval(intervalId);
  }, [setIsLoaded]); 

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-tr from-neutral-900 to-sky-700 text-zinc-900">
      <div className="w-[70%] relative h-[70%] pt-1 border-2 bg-gray-200 border-red-600 rounded-2xl px-5 pt-10">
        <div className="textstructure">
          <div>
            logo
          </div>
          {["Boost your", "Day,", "Your Way!"].map((item, index) => {
            return (
              <div className="masker" key={index}>
                <div className="w-fit flex items-end overflow-hidden">
                  {index === 1 && (
                    <div
                      className="mr-5 w-[8vw] rounded-md h-[5.7vw] -top-[1.2vw] relative bg-red-500"
                    ></div>
                  )}
                  <h1 className="uppercase text-[7vw] tracking-tighter leading-[6vw]">
                    {item}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full absolute bottom-2 flex justify-between pr-10">
          <h2 className='text-2xl'>Loading...</h2>
          <h1 className='text-[4vw] '>{countdown}%</h1> 
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
