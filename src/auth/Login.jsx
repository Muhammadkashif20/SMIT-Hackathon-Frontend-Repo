import React, { useState } from "react";
import { Spin, message } from "antd"; // Ant Design for spinner and message

function Login() {
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset the error state
    setError("");

    // Validation
    if (!nic || !password) {
      // Show error message using Ant Design's message.error
      message.error("Both NIC and Password are required.");
      return;
    }

    // Show loading spinner
    setIsLoading(true);

    // Simulate an API request
    setTimeout(() => {
      setIsLoading(false);
      message.success("Login successful!");

      // Clear the fields after successful login
      setNic("");
      setPassword("");
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
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

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
          >
            {isLoading ? (
              <Spin size="small" style={{ color: "white", marginRight: 10 }} />
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
