import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
  return (
      <div className="flex items-center justify-between border-b border-gray-300 px-12 p-2">

            <div className="flex items-center"> 
              <img width={'180px'} src={"https://www.saylaniwelfare.com/static/media/logo_saylaniwelfare.22bf709605809177256c.png"} alt="Logo"/>
            </div>

            <div>
               <h1 className="font-bold text-xl text-black">Saylani Microfinance App</h1>
            </div>
            
            <div className='flex gap-3'>
               <button className="cursor-pointer font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-md py-1.5 px-6">Loan Details</button>
               <Link to={'/login'}>
                   <button className="cursor-pointer font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-md py-1.5 px-6">Login</button>
               </Link>
            </div>
      </div>
  );
};

export default Header;
