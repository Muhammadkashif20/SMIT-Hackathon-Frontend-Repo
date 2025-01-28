import { Link } from "react-router-dom";
import herosectionimage from "../assets/image/herosectionimage.jpg";

function HeroSection() {
  return (
    <section className="pt-5 bg-gray-50 text-gray-600 body-font">
      <div className="contentDiv mx-auto flex px-18 pt-36 pb-36 md:flex-row flex-col items-center">
        <div
          className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0"
          data-aos="fade-up"
        >
          <h1 className="title-font text-green-600 sm:text-3xl text-3xl mb-4 font-bold hover:text-green-600 transition duration-300">
            Saylani Welfare International Trust
          </h1>
          <p className="text-gray-700 text-lg mb-5 mt-1 leading-relaxed hover:text-gray-800 transition duration-300">
            <span className="font-semibold">Saylani Microfinance App</span> is a
            platform designed to provide installment-based loans to the
            underprivileged, empowering them to improve their financial
            stability. Through this app, individuals can access financial
            resources that enable them to create better opportunities for
            long-term growth, self-reliance, and a brighter future.
          </p>
         
        </div>

        <div className="lg:w-[36vw] md:w-1/2 w-[80vw] relative">
          <img
            className="object-cover object-center rounded-md transition duration-500 transform hover:scale-105"
            alt="hero image"
            src={herosectionimage}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
