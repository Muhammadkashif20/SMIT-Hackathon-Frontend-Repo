import { useState, useEffect } from "react";
import { Spin } from "antd";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LoanCalculator from "../components/LoanCalculator";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Header />
          <HeroSection />
          <LoanCalculator />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;
