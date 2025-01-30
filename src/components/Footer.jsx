import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import saylanilogo from "../assets/image/saylani welfare.png";

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 text-gray-800">
      <div className="container mx-auto px-8 lg:px-20 py-16 flex flex-wrap justify-between">
        <div className="w-full lg:w-1/3 mb-10 lg:mb-0">
          <img width={"180px"} src={saylanilogo} alt="Saylani Welfare Logo" />
          <p className="mt-3 text-gray-700 font-medium leading-relaxed">
            Saylani Microfinance App provides installment-based loans to those
            in need, helping them build a better future.
          </p>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore</h2>
          <ul>
            {["About Us", "Contact Us", "Microfinance App"].map(
              (item, index) => (
                <li key={index} className="mt-3">
                  <Link
                    to={"/"}
                    className="text-gray-800 font-medium hover:text-blue-600 transition duration-300"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
          <ul>
            <li className="mt-3">
              <a
                href="https://www.google.com/maps?q=A-25,BahadurabadChowrangi,Karachi,Pakistan"
                className="text-gray-800 font-medium hover:text-blue-600 transition duration-300"
              >
                Main Bahadurabad Chowrangi, Karachi, Pakistan
              </a>
            </li>
            <li className="mt-3">
              <a
                href="mailto:info@saylaniwelfare.com"
                className="text-gray-800 font-medium hover:text-blue-600 transition duration-300"
              >
                info@saylaniwelfare.com
              </a>
            </li>
            <li className="mt-3">
              <a
                href="tel:+921117295264"
                className="text-gray-800 font-medium hover:text-blue-600 transition duration-300"
              >
                +92-311-1729526
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h2>
          <div className="flex space-x-4 mt-3">
            {[
              {
                icon: FaFacebookF,
                link: "https://www.facebook.com/SaylaniWelfareInternationalTrust/",
              },
              {
                icon: FaInstagram,
                link: "https://www.instagram.com/officialswit/?hl=en",
              },
              { icon: FaYoutube, link: "https://youtube.com/saylaniwelfare" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 p-3 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-200 py-4">
        <div className="container mx-auto px-5 flex flex-wrap flex-col sm:flex-row justify-between items-center">
          <p className="text-sm font-semibold text-gray-900 text-center w-full sm:w-auto">
            © 2025 Saylani Welfare Int Trust. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
