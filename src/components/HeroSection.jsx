import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative py-40 bg-gradient-to-r from-[#2C3E50] to-[#4CA1AF] text-white">
      <div className="container mx-auto flex flex-col items-center text-center px-6 space-y-6">

        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight animate-fadeInUp">
          Transforming Lives Through <br />
          <span className="text-[#FACC15]">Saylani Microfinance</span>
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed max-w-2xl animate-fadeInUp delay-100">
          Empowering communities with financial support, creating opportunities,
          and building a future free from poverty. Join us in making a
          difference today!
        </p>
        
          <Link to="/proceed">
          <button className="bg-[#FACC15] text-gray-900 px-6 py-3 rounded-full text-lg font-semibold transition-all hover:bg-[#FFD700] hover:scale-105 animate-fadeInUp delay-200">
          Get Started
        </button>
        </Link>

      </div>
    </section>
  );
}

export default HeroSection;
