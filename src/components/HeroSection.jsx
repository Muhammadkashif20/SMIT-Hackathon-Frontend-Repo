import HeroImage from "../assets/image/saylani.jpg";
function HeroSection() {
  return (
    <section
      className="relative py-20 bg-[#FAF3E0] bg-opacity-20 bg-cover bg-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight animate-fadeInUp">
            Empowering Communities through
            <span className="text-[#D97706]">
              {" "}
              Saylani Welfare Microfinance
            </span>
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed animate-fadeInUp delay-100">
            <span className="font-semibold text-gray-900">
              Saylani Welfare International Trust
            </span>{" "}
            is committed to uplifting the underprivileged communities by
            providing financial resources that promote growth, stability, and
            independence. Through the Saylani Microfinance platform, individuals
            are given access to affordable installment-based loans, helping them
            break the cycle of poverty and secure a brighter future.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="w-full sm:w-[90%] lg:w-[72%] relative">
            <img
              className="rounded-lg shadow-xl transition-all duration-500 hover:scale-105 animate-fadeInUp delay-100"
              alt="hero image"
              src={HeroImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
