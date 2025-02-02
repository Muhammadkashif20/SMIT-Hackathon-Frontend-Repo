import React, { useState } from "react";
import { message, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/baseurl";
import axios from "axios";

function Login() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    cnic: "",
    password: location.state?.password || "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
    const { cnic, password } = formData;
    if (!cnic || !password) {
      message.error("cnic and Password are required.");
      return;
    }
    setIsLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, formData);
      console.log("res=> ", res);
      if (res.data?.error) {
        message.error(res.data?.message || "Invalid Credentials");
      } else {
        message.success(res.data?.message || "Login Successfully!");
        navigate("/password");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      const errorMessage = error.response?.data?.message || "User Is Not Register Please Proceed! ";
      message.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="cnic"
              className="block text-sm font-medium text-gray-700"
            >
              CNIC
            </label>
            <input
              type="cnic"
              id="cnic"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your cnic"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 font-semibold rounded-md focus:outline-none ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isLoading ? (
              <Spin size="small" style={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
