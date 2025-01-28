import { Link } from "react-router-dom";
import saylanilogo from "../assets/image/saylani welfare.png";

function Footer() {
  return (
    <footer className="mt-24 border-t bg-gray-100 border-gray-300 text-gray-800 body-font">
      <div className="px-20 py-14 mx-auto flex flex-wrap justify-between">
        {/* Logo and Description */}
        <div className="w-64 flex-shrink-0">
          <img width={"180px"} src={saylanilogo} alt="Saylani Welfare Logo" />
          <p className="mt-2 text-sm text-gray-700 font-semibold p-2">
            Saylani Microfinance App is dedicated to providing installment-based loans to those in need, helping them build a better future.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex-grow flex flex-wrap justify-around md:pl-20 -mb-10 md:mt-0 mt-10">
          {/* About Section */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-bold text-gray-800 tracking-widest text-xl mb-3">EXPLORE</h2>
            <nav className="list-none mb-10">
              <li className="mt-5 mb-2">
                <Link to={"/"} className="font-medium text-gray-800 hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to={"/"} className="font-medium text-gray-800 hover:text-blue-600">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to={"/"} className="font-medium text-gray-800 hover:text-blue-600">
                  Microfinance App
                </Link>
              </li>
            </nav>
          </div>

          {/* Contact Details Section */}
          <div className="lg:w-96 md:w-1/2 w-full px-4">
            <h2 className="font-bold text-gray-800 tracking-widest text-xl mb-3">CONTACT</h2>
            <nav className="list-none mb-10">
              <li className="mt-5 mb-2">
                <a href="https://www.google.com/maps?q=A-25,BahadurabadChowrangi,Karachi,Pakistan" className="text-gray-800 hover:text-blue-600">
                  Main Bahadurabad Chowrangi, Karachi, Pakistan
                </a>
              </li>
              <li className="mb-2">
                <a href="mailto:info@saylaniwelfare.com" className="text-gray-800 hover:text-blue-600">
                  Email: info@saylaniwelfare.com
                </a>
              </li>
              <li className="mb-2">
                <a href="tel:+921117295264" className="text-gray-800 hover:text-blue-600">
                  Contact: 92-311-1729526
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="bg-gray-200 py-4">
  <div className="container mx-auto px-5 flex flex-wrap flex-col sm:flex-row justify-between items-center w-full">
    <p className="font-semibold text-gray-900 text-sm text-center w-full">
    Copyright © 2025 by  Saylani Welfare Int Trust
    </p>
  </div>
</div>

    </footer>
  );
}

export default Footer;
