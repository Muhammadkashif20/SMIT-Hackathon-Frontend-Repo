import React from "react";
import { Link } from "react-router-dom";
import saylanilogo from "../assets/image/saylani welfare.png";

function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full flex items-center justify-between border-b border-gray-300 bg-white/85 backdrop-blur-sm shadow-md px-6 lg:px-10 py-1">
      <div className="flex items-center">
        <img src={saylanilogo} alt="Saylani Logo" className="w-28 sm:w-36" />
      </div>

      <h1 className="font-bold text-lg sm:text-xl text-gray-800 text-center flex-1 hidden sm:block">
        Saylani Microfinance Platform
      </h1>

      <div>
        <Link to="/proceed">
          <button className="cursor-pointer font-semibold bg-green-600 hover:bg-green-500 text-white rounded-md py-2 px-6 text-sm sm:text-base transition-transform transform hover:scale-105">
            Proceed
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
