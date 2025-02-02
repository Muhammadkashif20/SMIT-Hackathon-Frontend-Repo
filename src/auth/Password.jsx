import React, { useState } from "react";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/baseurl";
function Password() {
  const [formData, setFormData] = useState({ password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.password) {
      message.error("Password is required.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    try {
      const res = await axios.post(`${BASE_URL}/auth/password`, formData);
      console.log("res=> ", res);
      message.success("Password Create successfully!");
      setFormData({password: ""});
      navigate("/user-dashboard");
    } catch (error) {
      console.error("Error submitting request:", error);
      message.error("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Enter New Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`cursor-pointer w-full py-3 px-4 font-semibold rounded-md focus:outline-none ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isLoading ? <Spin size="small" style={{ color: "white" }} /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Password;
