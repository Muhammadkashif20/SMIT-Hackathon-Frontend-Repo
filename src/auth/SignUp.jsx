import React, { useState } from "react";
import axios from "axios";
import { Base_Url } from "../utils/baseurl";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const response = await axios.post(`${Base_Url}/register`, { name, email, password });
      console.log("response=>", response);
    } catch (error) {
      console.error("error=>", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              required
              id="signUpUser"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Name"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              required
              id="signUpEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Email"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              required
              id="signUpPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Password"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center text-gray-600 mb-6">
            <label className="flex items-center">
              <input type="checkbox" id="remember" className="accent-blue-500" />
              <p className="ml-2">Remember me</p>
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
