import React, { useState } from "react";
import { Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/baseurl";

function Proceed() {
  const [formData, setFormData] = useState({
    cnic: "",
    email: "",
    fullname: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { cnic, email, fullname } = formData;
    if (!cnic || !email || !fullname)
      return message.error("All fields are required!");
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/proceed`, formData);
      const userEmail =res.data.data.newUser.email;  
      console.log("userEmail=>", userEmail);
      localStorage.setItem("email", userEmail); 

      const plainPassword = res.data.data.plainPassword;
      console.log("plainPassword=>", plainPassword);
      console.log("res.data=> ",res.data);      
        if (res.data.error) {
             message.error(res.data.message || "Invalid Credentials");
           } else {
             message.success(res.data.message || "Proceed Successfully!");
             const passwordData = { password: plainPassword };
             navigate("/login", { state: passwordData });             
           }
         } catch (error) {
           console.error("Error submitting request:", error);
           message.error(error.response.data?.msg || "Something went wrong");
         } finally {
           setIsLoading(false);
         }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Proceed</h2>
        <form onSubmit={handleSubmit}>
           {/* Name Input */}
           <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter Name"
            />
          </div>

          {/* CNIC Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              CNIC
            </label>
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter CNIC"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

         

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 font-semibold rounded-md ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isLoading ? (
              <Spin size="small" style={{ color: "white" }} />
            ) : (
              "Proceed"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Proceed;
