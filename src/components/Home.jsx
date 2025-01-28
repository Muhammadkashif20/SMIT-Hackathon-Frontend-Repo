import { useState, useEffect } from "react";
import { Spin } from "antd";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LoanCalculator from "../components/LoanCalculator";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spin
            size="large"
            spinning={loading}
            indicator={
              <div className="flex items-center justify-center">
                <div className="ant-spin-dot ant-spin-dot-spin">
                  <div className="ant-spin-dot-item ant-spin-dot-item-1 bg-green-500"></div>
                  <div className="ant-spin-dot-item ant-spin-dot-item-2 bg-white"></div>
                  <div className="ant-spin-dot-item ant-spin-dot-item-3 bg-green-500"></div>
                  <div className="ant-spin-dot-item ant-spin-dot-item-4 bg-white"></div>
                </div>
              </div>
            }
          />
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