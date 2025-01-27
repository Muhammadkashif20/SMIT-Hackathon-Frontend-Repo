import { Link } from "react-router-dom";
import herosectionimage from "../assets/image/herosectionimage.jpg";
function HeroSection(){

    return(
        <>
        <section className="pt-5 bg-gray-50 text-gray-600 body-font">
         <div className="contentDiv mx-auto flex px-18 pt-36 pb-36 md:flex-row flex-col items-center">
              
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0" data-aos="fade-up">
                 <h1 className="title-font text-green-500 sm:text-3xl text-3xl mb-4 font-bold">
                    Saylani Welfare International Trust
                 </h1>
                 <p className="text-gray-700 text-lg mb-5 mt-1 leading-relaxed">
                    <span className="font-semibold">Saylani Microfinance App</span>  is a platform designed to provide installment-based loans to the underprivileged, empowering them to improve their financial stability. Through this app, individuals can access financial resources that enable them to create better opportunities for long-term growth, self-reliance, and a brighter future.
                 </p>
                  <div className="flex lg:justify-center justify-start gap-3">
                      <Link to={'/user'}>
                         <button className="inline-flex cursor-pointer text-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-md">Apply For Loan</button>
                       </Link>
                  </div>
              </div>

              <div className="lg:w-[36vw] md:w-1/2 w-[80vw]">
                 <img
                   className="object-cover object-center rounded-md"
                   alt="hero image"
                   src={herosectionimage}
                 />
              </div>

           </div>
       </section>
        </>
    )
}

export default HeroSection;