import React from "react";
import { Link } from "react-router-dom";
import saylanilogo from "../assets/image/saylani welfare.png";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white shadow-sm px-6 lg:px-10 py-2">
      <div className="flex items-center">
        <img src={saylanilogo} alt="Saylani Logo" className="w-28 sm:w-36" />
      </div>

      <h1 className="font-bold text-lg sm:text-xl text-gray-800 text-center flex-1 hidden sm:block">
        Saylani Welfare Microfinance App
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
