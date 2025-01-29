import React, { useState } from "react";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";

function Password() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      message.error("Password is required.");
      return;
    }
    
    setIsLoading(true); // Set loading to true before starting the process

    // Simulate a loading process (like an API call)
    setTimeout(() => {
      setIsLoading(false); // Reset loading after the process is complete
      message.success("Login successful!");
      navigate("/user-dashbaord");
    }, 2000); // Simulating a 2-second delay for login
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Enter Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className={`cursor-pointer w-full py-3 px-4 font-semibold rounded-md focus:outline-none ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
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
