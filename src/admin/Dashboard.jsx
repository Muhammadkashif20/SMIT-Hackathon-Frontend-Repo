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
        backgroundColor: "#FF6347", // A more vibrant color
      },
    ],
  };

  return (
    <Layout>
      <div className="h-screen bg-gray-100 p-10">
        {/* Main Header Section */}
        <div className="flex flex-col space-y-8 mb-12">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-bold text-gray-900">User Dashboard</h1>
            <div className="bg-indigo-600 text-white py-3 px-8 rounded-md text-xl font-semibold">Overview</div>
          </div>

          <div className="text-gray-500 text-lg">
            <p>Welcome back, User! Here's a snapshot of your recent activity.</p>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-4">
              <FiUsers className="text-6xl text-blue-600" />
              <p className="text-3xl font-semibold text-blue-600">1,234</p>
            </div>
            <h2 className="text-xl font-semibold text-gray-600">Total Clients</h2>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-4">
              <FiDollarSign className="text-6xl text-green-600" />
              <p className="text-3xl font-semibold text-green-600">325</p>
            </div>
            <h2 className="text-xl font-semibold text-gray-600">Active Loans</h2>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-4">
              <FiBarChart className="text-6xl text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-600">Loan Trends</h2>
            <Bar data={chartData} />
          </div>
        </div>

        {/* Manage Applications Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mt-12">
          <h2 className="text-3xl font-semibold text-gray-700 mb-8">Manage Applications</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="city" className="block text-gray-600 text-lg">Select City</label>
              <select id="city" className="w-full mt-2 p-4 border rounded-md">
                <option value="">Select City</option>
                <option value="karachi">Karachi</option>
                <option value="lahore">Lahore</option>
              </select>
            </div>

            <div>
              <label htmlFor="country" className="block text-gray-600 text-lg">Select Country</label>
              <select id="country" className="w-full mt-2 p-4 border rounded-md">
                <option value="">Select Country</option>
                <option value="pakistan">Pakistan</option>
                <option value="india">India</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div>
              <label htmlFor="token" className="block text-gray-600 text-lg">Token Number</label>
              <input
                type="text"
                id="token"
                placeholder="Enter Token Number"
                className="w-full mt-2 p-4 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="details" className="block text-gray-600 text-lg">Application Details</label>
              <textarea
                id="details"
                placeholder="Enter Application Details"
                className="w-full mt-2 p-4 border rounded-md"
                rows="3"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button className="bg-indigo-600 text-white py-4 px-12 rounded-md hover:bg-indigo-700 transition duration-200">
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
