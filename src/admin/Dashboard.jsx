import React from "react";
import { FiUsers, FiDollarSign, FiBarChart } from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Layout from "./Sidebar";

const Dashboard = () => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Loan Disbursement",
        data: [5000, 10000, 15000, 20000, 25000, 30000],
        backgroundColor: "#4F46E5",
      },
    ],
  };

  return (
    <Layout>
      <div className="h-screen bg-gray-50 p-6">
        {/* Main Content */}
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <FiUsers className="text-4xl text-blue-600 mb-3" />
              <h2 className="text-xl font-semibold text-gray-700">Total Clients</h2>
              <p className="text-2xl font-bold text-blue-600">1,234</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <FiDollarSign className="text-4xl text-green-600 mb-3" />
              <h2 className="text-xl font-semibold text-gray-700">Active Loans</h2>
              <p className="text-2xl font-bold text-green-600">325</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <FiBarChart className="text-4xl text-purple-600 mb-3" />
              <h2 className="text-xl font-semibold text-gray-700">Loan Trends</h2>
              <Bar data={chartData} />
            </div>
          </div>

          {/* Manage Applications Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Applications</h2>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="city" className="text-gray-600">Select City</label>
                <select id="city" className="w-full p-3 border rounded-lg mt-2">
                  <option value="">Select City</option>
                  <option value="karachi">Karachi</option>
                  <option value="lahore">Lahore</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="country" className="text-gray-600">Select Country</label>
                <select id="country" className="w-full p-3 border rounded-lg mt-2">
                  <option value="">Select Country</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="india">India</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="token" className="text-gray-600">Token Number</label>
                <input
                  type="text"
                  id="token"
                  placeholder="Enter Token Number"
                  className="w-full p-3 border rounded-lg mt-2"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="details" className="text-gray-600">Application Details</label>
                <textarea
                  id="details"
                  placeholder="Enter Application Details"
                  className="w-full p-3 border rounded-lg mt-2"
                  rows="3"
                />
              </div>
            </div>

            <button className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200">
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
