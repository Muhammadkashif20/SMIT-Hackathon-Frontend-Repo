import React from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  // Redirect to Guarantors Page
  const handleViewDetails = () => {
    navigate("/guarantors");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-900">Welcome, User!</h1>
        <p className="text-lg text-gray-600">
          Here is your dashboard overview and recent activities.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Loans</h3>
          <p className="text-2xl font-bold text-blue-600">5</p>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800">Active Loans</h3>
          <p className="text-2xl font-bold text-green-600">3</p>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800">Pending Loans</h3>
          <p className="text-2xl font-bold text-orange-600">2</p>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Repayment</h3>
          <p className="text-2xl font-bold text-purple-600">₹75,000</p>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="shadow-md">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">
          Recent Activities
        </h2>
        <ul className="space-y-4">
          <li className="flex justify-between p-4 bg-gray-100 rounded-lg">
            <span>Loan Approved - ₹50,000</span>
            <Button
              type="link"
              className="text-blue-600"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
          </li>
          <li className="flex justify-between p-4 bg-gray-100 rounded-lg">
            <span>Guarantor Added - Ali Khan</span>
            <Button
              type="link"
              className="text-blue-600"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default UserDashboard;
