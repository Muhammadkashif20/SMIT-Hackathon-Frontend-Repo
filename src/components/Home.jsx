import { useState, useEffect } from "react";
import { Spin } from "antd";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LoanCalculator from "../components/LoanCalculator";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  console.log("token>",token);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  if (!token) {
    console.log("token>",token);
    navigate("/login");
  }

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
