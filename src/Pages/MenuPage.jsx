import React, { useState } from 'react'
import {isLoggedIn} from '../services/api.js'

const MenuPage = ({isMenuOpen, setIsMenuOpen}) => {


  
  return (
    <div className='w-full h-full flex justify-center items-center fixed top-0 z-[99999]'>
        <div className='w-[90%] h-[95%] flex-col bg-gray-800 rounded-2xl p-5'>

              <div className='h-1/4'>logo section
              
              // <button onClick={()=>(setIsMenuOpen(!isMenuOpen))}>close</button>
              
              </div>
              <div className='w-full h-[1px] bg-white'></div>
              <div className='pt-7'>
                {
<<<<<<< HEAD
                  isLoggedIn() ? <a href='/profile' className='text-xl mt-2'>Profile</a> : <a href='/profile' className='text-xl mt-2'>Login</a>
=======
                  isLoggedIn() ? <a href='/profile' className='text-xl mt-2'>Profile</a> : <a href='/login' className='text-xl mt-2'>Login</a>
>>>>>>> 82207ea (Enhance ui and ux 2)
                }
                
                <h3 className='text-xl mt-2'>Features</h3>
                <h3 className='text-xl mt-2'>How It works</h3>
                <h3 className='text-xl mt-2'>About Us</h3>
              </div>

        </div>
    </div>
  )
}

export default MenuPage;
