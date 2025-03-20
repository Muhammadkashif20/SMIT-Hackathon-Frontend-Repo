import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const loanCategories = [
  {
    name: "Wedding Loans",
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: 500000,
    period: 3,
  },
  {
    name: "Home Construction Loans",
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: 1000000,
    period: 5,
  },
  {
    name: "Business Startup Loans",
    subcategories: [
      "Buy Stall",
      "Advance Rent for Shop",
      "Shop Assets",
      "Shop Machinery",
    ],
    maxLoan: 1000000,
    period: 5,
  },
  {
    name: "Education Loans",
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: 1000000,
    period: 4,
  },
];

function LoanCalculator() {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [loanBreakdown, setLoanBreakdown] = useState(null);
  const [showProceed, setShowProceed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleCalculate = () => {
    setLoanBreakdown(null);
    setErrorMessage("");

    if (!category || !subcategory || !initialDeposit || !loanPeriod) {
      setErrorMessage("⚠️ Please fill all the fields.");
      return;
    }

    if (Number(initialDeposit) <= 0 || Number(loanPeriod) <= 0) {
      setErrorMessage(
        "⚠️ Initial Deposit and Loan Period must be greater than 0."
      );
      return;
    }

    const selectedCategory = loanCategories.find(
      (cat) => cat.name === category
    );
    const maxLoan = selectedCategory.maxLoan;
    const initialDepositNumber = Number(initialDeposit);
    const loanPeriodNumber = Number(loanPeriod);

    if (initialDepositNumber >= maxLoan) {
      setErrorMessage(
        "⚠️ Initial deposit cannot be greater than or equal to the maximum loan amount."
      );
      return;
    }

    const loanAmount = maxLoan - initialDepositNumber;
    const monthlyPayment = loanAmount / (loanPeriodNumber * 12);

    setLoanBreakdown({
      loanAmount: loanAmount.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      yearlyPayment: (monthlyPayment * 12).toFixed(2),
      totalPayment: loanAmount.toFixed(2),
    });

    setShowProceed(true);

    setCategory("");
    setSubcategory("");
    setInitialDeposit("");
    setLoanPeriod("");
  };

  const handleProceed = () => {
    navigate("/proceed");
  };

  return (
    <div className="pt-20 py-16 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-10">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Loan Calculator
        </h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select
            className="border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-green-600 cursor-pointer"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory("");
            }}
          >
            <option value="" disabled>
              Select Loan Category
            </option>
            {loanCategories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-green-600 cursor-pointer"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            disabled={!category}
          >
            <option value="" disabled>
              Select Subcategory
            </option>
            {category &&
              loanCategories
                .find((cat) => cat.name === category)
                ?.subcategories.map((sub, ind) => (
                  <option key={ind} value={sub}>
                    {sub}
                  </option>
                ))}
          </select>

          <input
            className="border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-green-600"
            type="number"
            placeholder="Max Loan Provided"
            value={
              category &&
              loanCategories.find((cat) => cat.name === category)?.maxLoan
            }
            readOnly
          />

          <input
            className="border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-green-600"
            type="number"
            placeholder="Initial Deposit (PKR)"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
          />

          <input
            className="border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-green-600"
            type="number"
            placeholder="Loan Period (Years)"
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(e.target.value)}
          />
        </div>

        <button
          className="w-full mt-6 text-lg font-semibold bg-green-600 text-white py-3 rounded-lg transition-transform transform hover:scale-105 hover:bg-green-700 cursor-pointer"
          onClick={handleCalculate}
        >
          Calculate Loan
        </button>

        {loanBreakdown && (
          <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Loan Breakdown
            </h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Loan Amount",
                  value: `PKR ${loanBreakdown.loanAmount}`,
                },
                {
                  label: "Monthly Payment",
                  value: `PKR ${loanBreakdown.monthlyPayment}`,
                },
                {
                  label: "Yearly Payment",
                  value: `PKR ${loanBreakdown.yearlyPayment}`,
                },
                {
                  label: "Total Payment",
                  value: `PKR ${loanBreakdown.totalPayment}`,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-md rounded-lg p-4 hover:bg-green-50 transition duration-300"
                >
                  <h4 className="text-sm font-medium">{item.label}</h4>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {showProceed && (
          <button
            className="mt-6 w-full text-lg font-semibold bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 cursor-pointer"
            onClick={handleProceed}
          >
            Proceed
          </button>
        )}
      </div>
    </div>
  );
}

export default LoanCalculator;
