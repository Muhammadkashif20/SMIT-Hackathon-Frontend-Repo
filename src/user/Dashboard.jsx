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
    console.log("activities=>",activities);
    setRecentActivities(activities);
  }, []);

  return (
    <>    
      <Sidebar>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          {token ? (
            <div className="mb-8">
              <h1 className="text-4xl font-semibold text-blue-900">
                Welcome Back, {userName}!
              </h1>
              <p className="text-blue-600 mt-2 text-lg">
                Here's an overview of your account and recent activities.
              </p>
            </div>
          ) : (
            <div className="mb-8">
              <h1 className="text-4xl font-semibold text-blue-900">
                Welcome Back, User!
              </h1>
              <p className="text-blue-600 mt-2 text-lg">
                Here's an overview of your account and recent activities.
              </p>
            </div>
          )}

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Total Loans
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                </div>
                <DollarOutlined className="text-3xl text-green-500 rounded-full p-2 bg-green-100" />
              </div>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Active Loans
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">2</p>
                </div>
                <CheckCircleOutlined className="text-3xl text-teal-500 rounded-full p-2 bg-teal-100" />
              </div>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Pending Loans
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">1</p>
                </div>
                <CalendarOutlined className="text-3xl text-orange-400 rounded-full p-2 bg-orange-100" />
              </div>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Total Repayment
                  </h3>
                  <p className="text-2xl font-bold text-green-600">₹50,000</p>
                </div>
                <DollarOutlined className="text-3xl text-purple-500 rounded-full p-2 bg-purple-100" />
              </div>
            </Card>
          </div>
          <Card className="shadow-md">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-150"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Loan Application By {activity.name}
                      </h3>
                      <p className="text-gray-500">{activity.categories} - ${activity.maximumloan}</p>
                      
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No recent activities found.</p>
              )}
            </div>
          </Card>
          
        </div>
      </Sidebar>
    </>
  );
}

export default Dashboard;
