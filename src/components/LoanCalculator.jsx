import React, { useState } from "react";

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

  const handleCalculate = () => {
    if (!category || !initialDeposit || !loanPeriod) return;

    const selectedCategory = loanCategories.find(
      (currentCategory) => currentCategory.name === category
    );
    const maxLoan = selectedCategory.maxLoan;
    const initialDepositNumber = Number(initialDeposit);
    const loanPeriodNumber = Number(loanPeriod);

    if (initialDepositNumber >= maxLoan) {
      setLoanBreakdown({
        error:
          "Initial deposit cannot be greater than or equal to the maximum loan amount.",
      });
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
  };

  return (
    <div className="pt-24 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="shadow text-3xl text-white bg-blue-500 font-bold text-center py-3 mb-8 rounded-lg transform transition duration-300 hover:scale-105">
          Calculate Your Loan
        </h2>

        <div className="shadow bg-white rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select category
              </option>
              {loanCategories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option value="" disabled>
                Select subcategory
              </option>
              {category &&
                loanCategories
                  .find((currentCategory) => currentCategory.name === category)
                  .subcategories.map((sub, ind) => (
                    <option key={ind} value={sub}>
                      {sub}
                    </option>
                  ))}
            </select>
            <input
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="number"
              placeholder="Max Loan Provided"
              value={
                category &&
                loanCategories.find(
                  (currentCategory) => currentCategory.name === category
                ).maxLoan
              }
              readOnly={true}
            />
            <input
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="number"
              placeholder="Initial deposit (PKR)"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
            />
            <input
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="number"
              placeholder="Loan period (years)"
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(e.target.value)}
            />
          </div>
          <button
            className="cursor-pointer font-semibold mt-8 w-full text-white bg-blue-600 hover:bg-blue-500 p-3 rounded-lg transition duration-300 transform hover:scale-105"
            onClick={handleCalculate}
          >
            Calculate
          </button>

          {loanBreakdown && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Loan Breakdown</h3>
              {loanBreakdown.error ? (
                <p className="text-red-500">{loanBreakdown.error}</p>
              ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-white shadow rounded-lg p-4 hover:bg-blue-50 transition duration-300">
                    <h4 className="text-sm font-medium">Loan Amount</h4>
                    <p className="text-2xl font-bold">
                      PKR {loanBreakdown.loanAmount}
                    </p>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 hover:bg-blue-50 transition duration-300">
                    <h4 className="text-sm font-medium">Monthly Payment</h4>
                    <p className="text-2xl font-bold">
                      PKR {loanBreakdown.monthlyPayment}
                    </p>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 hover:bg-blue-50 transition duration-300">
                    <h4 className="text-sm font-medium">Yearly Payment</h4>
                    <p className="text-2xl font-bold">
                      PKR {loanBreakdown.yearlyPayment}
                    </p>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 hover:bg-blue-50 transition duration-300">
                    <h4 className="text-sm font-medium">Total Payment</h4>
                    <p className="text-2xl font-bold">
                      PKR {loanBreakdown.totalPayment}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanCalculator;
