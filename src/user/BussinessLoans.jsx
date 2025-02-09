import { useState, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import { Modal, Table, message, Spin } from "antd";
import { BASE_URL } from "../utils/baseurl";
import axios from "axios";
import { Tag } from "antd";

function BusinessLoans() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    categories: "",
    subCategories: "",
    maximumloan: "",
    loanperiod: "",
    city: "",
    country: "",
  });
  const [loanRequests, setLoanRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);

  useEffect(() => {
    const savedLoans = JSON.parse(localStorage.getItem("loanRequests")) || [];
    setLoanRequests(savedLoans);
  }, []);

  useEffect(() => {
    const subCategoriesData = {
      Valima: ["Valima Hall", "Valima Food"],
      Furniture: ["Bed Set", "Sofa", "Table"],
      "Valima Food": ["Catering", "Buffet"],
      Jahez: ["Jewelry", "Clothing", "Electronics"],
    };

    setSubCategoriesOptions(subCategoriesData[formData.categories] || []);
    setFormData((prev) => ({ ...prev, subCategories: "" }));
  }, [formData.categories]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handlePost = async () => {
    const { name, email, categories, subCategories, maximumloan, loanperiod, city, country } =formData;
    if (!name || !email || !categories || !subCategories || !maximumloan || !loanperiod || !city || !country) {
      message.error("Please fill all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/loan/addLoanRequest`, formData);
      console.log("res=> ", res);
      const newLoanRequest = { ...formData, status: "Pending" };
      const updatedLoanRequests = [...loanRequests, newLoanRequest];

      localStorage.setItem("loanRequests", JSON.stringify(updatedLoanRequests));
      setLoanRequests(updatedLoanRequests);
      
      message.success("Loan Request Submitted");
      setIsModalOpen(false);
      setFormData({
        name: "",
        email: "",
        categories: "",
        subCategories: "",
        maximumloan: "",
        loanperiod: "",
        city: "",
        country: "",
      });
    } catch (error) {
      console.error("Error submitting loan request:", error);
      message.error("Failed to submit loan request");
    } finally {
      setIsLoading(false);
    }
  };


  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Categories", dataIndex: "categories", key: "categories" },
    { title: "Sub Categories", dataIndex: "subCategories", key: "subCategories" },
    { title: "Maximum Loan", dataIndex: "maximumloan", key: "maximumloan" },
    { title: "Loan Period (Years)", dataIndex: "loanperiod", key: "loanperiod" },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status) => {
        let color = "";
        if (status === "Pending") color = "orange"; 
        else if (status === "Approved") color = "green"; 
        else if (status === "Rejected") color = "red"; 
  
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];
  
  

  return (
    <>
      <Sidebar>
        <div className="flex justify-between mb-6">
          <h1 className="text-center text-blue-600 text-2xl font-bold">
            Business Loan
          </h1>
          <button
            onClick={showModal}
            className="cursor-pointer bg-blue-600 text-white font-semibold rounded-md py-1.5 px-6 text-lg"
          >
            Get Loan
          </button>
        </div>

        <Table
          columns={columns}
          dataSource={loanRequests}
          rowKey={(record) => record.email}
          pagination={false}
        />

        <Modal
          title="Wedding Loan"
          onCancel={handleCancel}
          open={isModalOpen}
          onOk={handlePost}
          footer={null}
        >
<div className="grid grid-cols-2 gap-3 pt-5">
  <input
    name="name"
    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
    type="text"
    placeholder="Enter Your Name"
    value={formData.name}
    onChange={handleChange}
    aria-label="Enter Your Name"
  />
  <input
    name="email"
    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
    type="email"
    placeholder="Enter Your Email"
    value={formData.email}
    onChange={handleChange}
    aria-label="Enter Your Email"
  />
</div>

<div className="grid grid-cols-2 gap-3 pt-5">
  <select
    name="country"
    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
    value={formData.country}
    onChange={handleChange}
    aria-label="Select Country"
  >
    <option value="">Select Country</option>
    <option value="Pakistan">Pakistan</option>
    <option value="India">India</option>
    <option value="USA">USA</option>
    <option value="UK">UK</option>
  </select>

  {formData.country && (
    <select
      name="city"
      className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
      value={formData.city}
      onChange={handleChange}
      aria-label="Select City"
    >
      <option value="">Select City</option>
      {formData.country === "Pakistan" && (
        <>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
        </>
      )}
      {formData.country === "India" && (
        <>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
        </>
      )}
      {formData.country === "USA" && (
        <>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </>
      )}
      {formData.country === "UK" && (
        <>
          <option value="London">London</option>
          <option value="Manchester">Manchester</option>
          <option value="Birmingham">Birmingham</option>
        </>
      )}
    </select>
  )}
</div>

<div className="grid grid-cols-2 gap-3 pt-5">
  <select
    name="categories"
    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
    value={formData.categories}
    onChange={handleChange}
    aria-label="Select Loan Categories"
  >
    <option value="">Select Category</option>
    <option value="Valima">Valima</option>
    <option value="Furniture">Furniture</option>
    <option value="Valima Food">Valima Food</option>
    <option value="Jahez">Jahez</option>
  </select>

  {formData.categories && subCategoriesOptions.length > 0 && (
    <select
      name="subCategories"
      className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
      value={formData.subCategories}
      onChange={handleChange}
      aria-label="Select Sub Category"
    >
      <option value="">Select Sub Category</option>
      {subCategoriesOptions.map((sub) => (
        <option key={sub} value={sub}>
          {sub}
        </option>
      ))}
    </select>
  )}
</div>

<div className="grid grid-cols-2 gap-3 pt-5">
  <input
    name="maximumloan"
    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
    type="number"
    placeholder="Enter Maximum Loan Amount"
    value={formData.maximumloan}
    onChange={handleChange}
    aria-label="Enter Maximum Loan Amount"
  />

  <input
    name="loanperiod"
    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
    type="number"
    placeholder="Enter Loan Period (Years)"
    value={formData.loanperiod}
    onChange={handleChange}
    aria-label="Enter Loan Period (Years)"
  />
</div>

<div className="pt-5 ">
  <button
    onClick={handlePost}
    className="cursor-pointer bg-blue-600 text-white w-full rounded-md py-2"
  >
    {isLoading ? <Spin size="small" style={{ color: "white" }} /> : "Submit"}
  </button>
</div>

        </Modal>
      </Sidebar>
    </>
  );
}

export default BusinessLoans;
