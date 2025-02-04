import React, { useState } from "react";
import { message, Spin } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/baseurl";
import axios from "axios";

function Password() {
  const [formData, setFormData] = useState({ oldPassword:"", newPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false); 
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.oldPassword || !formData.newPassword) {
      message.error("Both fields are required.");
      return;
    }
    setIsLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/auth/updatePassword`, formData);
      message.success("Password updated successfully!");
      setFormData({ oldPassword: "", newPassword: "" });
      navigate("/user-dashbaord");
    } catch (error) {
      console.error("Error submitting request:", error);
      message.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Password</h2>
        <form onSubmit={handleSubmit}>
          {/* Old Password Field */}
          <div className="mb-4 relative">
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"} 
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Old Password"
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)} 
              className="absolute right-3 top-10 cursor-pointer"
            >
              {showOldPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
          {/* New Password Field */}
          <div className="mb-4 relative">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"} 
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter New Password"
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)} // Toggle visibility
              className="absolute right-3 top-10 cursor-pointer"
            >
              {showNewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`cursor-pointer w-full py-3 px-4 font-semibold rounded-md focus:outline-none ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isLoading ? <Spin size="small" style={{ color: "white" }} /> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Password;
