import { Card } from "antd";
import {
  DollarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Dashboard() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("fullname");
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const activities = JSON.parse(localStorage.getItem("loanRequests")) || [];
    console.log("activities=>", activities);
    setRecentActivities(activities);
  }, []);

  return (
    <>    
      <Sidebar>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* ✅ Welcome Section (Mobile-friendly text sizes) */}
          <div className="mb-6 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-semibold text-blue-900">
              Welcome Back, {token ? userName : "User"}!
            </h1>
            <p className="text-blue-600 mt-1 sm:mt-2 text-base sm:text-lg">
              Here's an overview of your account and recent activities.
            </p>
          </div>

          {/* ✅ Responsive Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            
            <Card className="shadow-md hover:shadow-lg transition duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800">Total Loans</h3>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">3</p>
                </div>
                <DollarOutlined className="text-2xl sm:text-3xl text-green-500 bg-green-100 p-2 rounded-full" />
              </div>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800">Active Loans</h3>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">2</p>
                </div>
                <CheckCircleOutlined className="text-2xl sm:text-3xl text-teal-500 bg-teal-100 p-2 rounded-full" />
              </div>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800">Pending Loans</h3>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">1</p>
                </div>
                <CalendarOutlined className="text-2xl sm:text-3xl text-orange-400 bg-orange-100 p-2 rounded-full" />
              </div>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800">Total Repayment</h3>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">₹50,000</p>
                </div>
                <DollarOutlined className="text-2xl sm:text-3xl text-purple-500 bg-purple-100 p-2 rounded-full" />
              </div>
            </Card>
          </div>

          {/* ✅ Responsive Recent Activities Card */}
          <Card className="shadow-md p-4">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-4">Recent Activities</h2>
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition duration-150"
                  >
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                        Loan Application By {activity.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500">
                        {activity.categories} - ${activity.maximumloan}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm sm:text-base">No recent activities found.</p>
              )}
            </div>
          </Card>
          
        </div>
      </Sidebar>
    </>
  );
}

export default Dashboard;
