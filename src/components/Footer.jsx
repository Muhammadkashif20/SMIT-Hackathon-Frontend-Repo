import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import saylanilogo from "../assets/image/saylani welfare.png";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900 py-16">
      <div className="container mx-auto px-8 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo & Description */}
        <div>
          <img width="180px" src={saylanilogo} alt="Saylani Welfare Logo" />
          <p className="mt-4 text-gray-700 leading-relaxed">
            Providing financial solutions and support to uplift communities.
            Together, we can make an impact.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Quick Links</h2>
          <ul className="space-y-2">
            {["About", "Projects", "Donate", "Contact"].map((item, index) => (
              <li key={index}>
                <Link to="/" className="hover:text-blue-800 transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Contact</h2>
          <ul className="space-y-2">
            <li>
              <a href="mailto:info@saylaniwelfare.com" className="hover:text-blue-800 transition">
                info@saylaniwelfare.com
              </a>
            </li>
            <li>
              <a href="tel:+921117295264" className="hover:text-blue-800 transition">
                +92-311-1729526
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            {[{
              icon: FaFacebookF,
              link: "https://www.facebook.com/SaylaniWelfareInternationalTrust/"
            },
            {
              icon: FaInstagram,
              link: "https://www.instagram.com/officialswit/?hl=en"
            },
            {
              icon: FaYoutube,
              link: "https://www.youtube.com/@SaylaniWelfareTrustOfficial"
            }].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-blue-200 hover:bg-blue-500 hover:text-white transition"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 border-t border-gray-300 pt-4 text-center text-sm text-gray-600">
        © 2025 Saylani Welfare Int Trust. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
