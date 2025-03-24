import { useState, useEffect } from "react";
import { Spin } from "antd";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LoanCalculator from "../components/LoanCalculator";
import { useNavigate } from "react-router-dom";
import LoanCategories from "./LoanCategories";

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
  useEffect(() => {
    if (!token) {
      const allowedRoutes = ["/", "/login"];
      if (!allowedRoutes.includes(window.location.pathname)) {
        navigate("/login");
      }
    }
  }, [token, navigate]);

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
          <LoanCategories/>
          <LoanCalculator />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;
