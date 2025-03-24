import React from "react";
import { FaBriefcase, FaHeart, FaTools, FaGraduationCap } from "react-icons/fa";

const LoanCategories = () => {
  const loanTypes = [
    { title: "Business Loan", icon: <FaBriefcase />, description: "Expand your business with flexible financing options." },
    { title: "Wedding Loan", icon: <FaHeart />, description: "Make your special day memorable with financial ease." },
    { title: "Construction Loan", icon: <FaTools />, description: "Build your dream home with hassle-free loans." },
    { title: "Education Loan", icon: <FaGraduationCap />, description: "Invest in your future with our education loan plans." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Easy & Flexible Loan Options 💰
        </h1>
        <p className="text-lg font-semibold text-green-700 mb-6">
          "We provide loans to support your financial needs!"
        </p>
        <p className="text-gray-600 max-w-xl mx-auto">
        Whether it's business growth, education, home construction, or a wedding, our loan plans are designed to support you at every step.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {loanTypes.map((loan, index) => (
          <div
            key={index}
            className="bg-white shadow-lg p-6 rounded-xl text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-blue-600 text-4xl mb-4">{loan.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800">{loan.title}</h2>
            <p className="text-gray-600 mt-2">{loan.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanCategories;
