import React from 'react';
import { Link } from 'react-router-dom';
import saylanilogo from "../assets/image/saylani welfare.jpeg";

function Header() {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 lg:px-16 sm:px-12 p-3">
      <div className="flex justify-center items-center gap-1">
        <img 
          width={'150px'} 
          src={saylanilogo} 
          alt="Logo" 
          className="sm:w-32"
        />
        <h1 className="font-bold text-xl text-gray-800 hidden sm:block ">Saylani Microfinance App</h1>
      </div>

      <div className='flex gap-3'>
        <Link to={'/login'}>
          <button className="cursor-pointer font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-md py-1.5 px-6 text-sm sm:text-base">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;

