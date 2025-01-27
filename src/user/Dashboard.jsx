import UserLayout from "./userComponents/UserLayout";
import { Card, Progress, Button } from "antd";
import { ArrowRightOutlined, DollarOutlined, CalendarOutlined, CheckCircleOutlined } from "@ant-design/icons";

function User(){

    return(
        <>
          <UserLayout>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-blue-900">Welcome Back, User!</h1>
                <p className="text-blue-600 mt-2">
                  Here's an overview of your account and recent activities.
                </p>
              </div>
            
              {/* Quick Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Total Loans</h3>
                      <p className="text-2xl font-bold text-blue-600">3</p>
                    </div>
                    <DollarOutlined className="text-3xl text-green-500" />
                  </div>
                </Card>
            
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Active Loans</h3>
                      <p className="text-2xl font-bold text-blue-600">2</p>
                    </div>
                    <CheckCircleOutlined className="text-3xl text-teal-500" />
                  </div>
                </Card>
            
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Pending Loans</h3>
                      <p className="text-2xl font-bold text-blue-600">1</p>
                    </div>
                    <CalendarOutlined className="text-3xl text-orange-400" />
                  </div>
                </Card>
            
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Total Repayment</h3>
                      <p className="text-2xl font-bold text-green-600">₹50,000</p>
                    </div>
                    <DollarOutlined className="text-3xl text-purple-500" />
                  </div>
                </Card>
              </div>

              {/* Loan Progress Section */}
              <Card className="shadow-md mb-8">
                <h2 className="text-xl font-bold text-indigo-900 mb-4">Loan Repayment Progress</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Wedding Loan</h3>
                    <Progress percent={70} status="active" strokeColor="green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Education Loan</h3>
                    <Progress percent={40} status="active" strokeColor="blue" />
                  </div>
                </div>
              </Card>
            
              {/* Recent Activities Section */}
              <Card className="shadow-md">
                <h2 className="text-xl font-bold text-indigo-900 mb-4">Recent Activities</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Loan Approved</h3>
                      <p className="text-gray-500">Wedding Loan - ₹1,00,000</p>
                    </div>
                    <Button type="link" icon={<ArrowRightOutlined />} className="text-indigo-600">
                      View Details
                    </Button>
                  </div>
            
                  <div className="flex items-center justify-between p-4 bg-teal-50 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Repayment Received</h3>
                      <p className="text-gray-500">Education Loan - ₹10,000</p>
                    </div>
                    <Button type="link" icon={<ArrowRightOutlined />} className="text-teal-600">
                      View Details
                    </Button>
                  </div>
            
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">New Loan Application</h3>
                      <p className="text-gray-500">Business Loan - ₹2,00,000</p>
                    </div>
                    <Button type="link" icon={<ArrowRightOutlined />} className="text-orange-600">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </UserLayout>
        </>
    )
}

export default User;