import React, { useState } from "react";
import { Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

function Proceed() {
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if all fields are filled
    if (!nic || !email || !password) {
      message.error("All fields are required!");
      return;
    }

    // Start loading
    setIsLoading(true);

    // Simulate API call or process
    setTimeout(() => {
      setIsLoading(false);
      message.success("Proceed successfully!");
      setNic("");
      setEmail("");
      setPassword("");
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Proceed</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nic" className="block text-sm font-medium text-gray-700">
              NIC
            </label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter NIC"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 font-semibold rounded-md focus:outline-none ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isLoading ? <Spin size="small" style={{ color: "white" }} /> : "Proceed"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Proceed;
