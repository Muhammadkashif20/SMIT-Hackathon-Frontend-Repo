import React, { useState } from "react";
import { message, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { BASE_URL } from "../utils/baseurl";
import axios from "axios";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cnic: "",
    password: location.state?.password || ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      message.error("CNIC and Password are required.");
      return;
    }
    setIsLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, formData,{
         headers: { "Content-Type": "application/json" }
      });
      
      console.log("res=> ", res?.data?.data);
      const token = res.data?.data?.token;
      const userName =res.data.data?.user?.fullname;   
      const role= res.data.data?.user?.role
      localStorage.setItem("fullname", userName); 
      console.log("login token=>",token);
      console.log("userName=>",userName);
      console.log("res role user=>",role);
      localStorage.setItem("role", role);
      if (token) {
        localStorage.setItem("token", token); 
      }
      if (res.data.data?.user?.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
      if (res.data?.error) {
        message.error(res.data?.msg );
      } else {
        message.success(res.data.data?.msg || "Login Successfully!");
        if (res.data.data?.user?.role !== "admin") {
          const passwordData = { password: password };
          navigate("/password", { state: passwordData });
        }
      }
    } catch (error) {
      console.log("Error submitting request:", error);
      const errorMessage = error.response.data?.msg || "Something went wrong";
        console.log("errorMessage=>",errorMessage);
      message.error(errorMessage);
    } finally { 
      setIsLoading(false);
    }
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
      return;
    }    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* CNIC Input */}
          <div className="mb-4">
            <label
              htmlFor="cnic"
              className="block text-sm font-medium text-gray-700"
            >
              CNIC
            </label>
            <input
              type="text"
              id="cnic"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your CNIC"
            />
          </div>
          {/* Password Input */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Enter your password"
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`cursor-pointer w-full py-3 px-4 font-semibold rounded-md focus:outline-none ${
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
