import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LoanCalculator from "../components/LoanCalculator";

function Home(){
    return(
        <>
           {/* Header */}
            <Header/>
            
           {/* Hero Section */}
            <HeroSection/>
             
           {/* Loan Calculator */}
             <LoanCalculator/>

            {/* Footer */}
            <Footer/>
        </>
    )
}
export default Home;