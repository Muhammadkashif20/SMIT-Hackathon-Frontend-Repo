import React from "react";
import { Link } from "react-router-dom";
import saylanilogo from "../assets/image/saylani welfare.png";

function Header() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 lg:px-12 sm:px-10">
      <div className="flex items-center gap-3">
        <img width={"150px"} src={saylanilogo} alt="Logo" className="sm:w-32" />
      </div>

      <div className="flex-grow flex justify-center">
        <h1 className="font-bold text-xl text-gray-800 hidden sm:block">
          Saylani Welfare Microfinance App
        </h1>
      </div>
      <div className="flex gap-3">
        <Link to={"/proceed"}>
          <button className="cursor-pointer font-semibold bg-green-600 hover:bg-green-500 text-white rounded-md py-1.5 px-6 text-sm sm:text-base">
            Proceed
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
