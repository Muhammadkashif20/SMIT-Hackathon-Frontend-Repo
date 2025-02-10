import { useState, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import { Modal, Table, message, Spin, Tag } from "antd";
import { BASE_URL } from "../utils/baseurl";
import axios from "axios";

function EducationalLoans() {
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    loanType: "",
    categories: "",
    subCategories: "",
    maximumloan: "",
    email: "",
    loanperiod: "",
    city: "",
    country: "",
  });

  const [loanRequests, setLoanRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const countryCityMap = {
    Pakistan: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar"],
    India: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai"],
    Bangladesh: ["Dhaka", "Chittagong", "Khulna"],
    SriLanka: ["Colombo", "Kandy", "Galle"],
    Nepal: ["Kathmandu", "Pokhara", "Lalitpur"],
  };

  const subCategoriesOptions = {
    Valima: ["Hall Decoration", "Catering", "Photography"],
    Furniture: ["Sofa Set", "Bed Set", "Dining Table"],
    Jahez: ["Jewelry", "Clothes", "Electronics"],
  };

  useEffect(() => {
    const savedLoans = JSON.parse(localStorage.getItem("loanRequests")) || [];
    setLoanRequests(savedLoans);
  }, []);

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, subCategories: "" }));
  }, [formData.categories]);

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, city: "" }));
  }, [formData.country]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handlePost = async () => {
    const { name, email, cnic, loanType, categories, subCategories, maximumloan, loanperiod, city, country } = formData;
    if (!name || !cnic || !loanType || !categories || !subCategories || !maximumloan || !loanperiod || !city || !country) {
      message.error("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/loan/addLoanRequest`, formData);
      const newLoanRequest = { ...formData, status: "Pending" };
      const updatedLoanRequests = [...loanRequests, newLoanRequest];
      localStorage.setItem("loanRequests", JSON.stringify(updatedLoanRequests));
      setLoanRequests(updatedLoanRequests);
      message.success("Loan Request Submitted");
      setIsModalOpen(false);
      setFormData({
        name: "",
        cnic: "",
        loanType: "",
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
    { title: "Loan Type", dataIndex: "loanType", key: "loanType" },
    { title: "Categories", dataIndex: "categories", key: "categories" },
    { title: "Maximum Loan", dataIndex: "maximumloan", key: "maximumloan" },
    { title: "Loan Period (Years)", dataIndex: "loanperiod", key: "loanperiod" },
  
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Pending" ? "orange" : status === "Approved" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <Sidebar>
      <div className="flex justify-between mb-6">
        <h1 className="text-center text-blue-600 text-2xl font-bold">Educational Loans</h1>
        <button onClick={showModal} className="cursor-pointer bg-blue-600 text-white font-semibold rounded-md py-1.5 px-6 text-lg">
          Get Loan
        </button>
      </div>

      <Table columns={columns} dataSource={loanRequests} rowKey={(record) => record.email} pagination={false} />

      <Modal title="Wedding Loan" onCancel={handleCancel} open={isModalOpen} footer={null}>
        <div className="grid grid-cols-2 gap-3 pt-5">
          <input name="name" className="border border-gray-300 rounded-md p-2 focus:outline-none w-full" type="text" placeholder="Enter Your Name" value={formData.name} onChange={handleChange} />
        <input name="email"  className="border border-gray-300 rounded-md p-2 focus:outline-none w-full " type="text" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} />
        </div>
<div className="grid grid-cols-2 gap-3">
  
        <select name="country" className="border border-gray-300 rounded-md p-2 focus:outline-none w-full mt-4" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {Object.keys(countryCityMap).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select name="city" className="border border-gray-300 rounded-md p-2 focus:outline-none w-full mt-4" value={formData.city} onChange={handleChange} disabled={!formData.country}>
          <option value="">Select City</option>
          {formData.country &&
            countryCityMap[formData.country].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
                </div>
        <div className="grid grid-cols-2 gap-3 ">
          <select name="loanType" className="border border-gray-300 rounded-md p-2 focus:outline-none w-full mt-4" value={formData.loanType} onChange={handleChange}>
            <option value="">Select Loan Type</option>
            <option value="Wedding Loan">Wedding Loan</option>
          </select>
          <select name="categories" className="border border-gray-300 rounded-md p-2 focus:outline-none w-full mt-4" value={formData.categories} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Valima">Valima</option>
            <option value="Furniture">Furniture</option>
            <option value="Jahez">Jahez</option>
          </select>
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

  {/* <input
    name="loanperiod"
    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
    type="number"
    placeholder="Enter Loan Period (Years)"
    value={formData.loanperiod}
    onChange={handleChange}
    aria-label="Enter Loan Period (Years)"
  /> */}
    <select name="loanperiod" className="border border-gray-300 rounded-md p-2 focus:outline-none w-full " value={formData.loanperiod} onChange={handleChange}>
          <option value="">Select Loan Period</option>
          {[...Array(7)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{`${i + 1} Year${i + 1 > 1 ? 's' : ''}`}</option>
          ))}
        </select>
</div>
<div className="grid grid-cols-2 gap-3">
<input name="cnic"  className="border border-gray-300 rounded-md p-2 focus:outline-none w-full mt-4" type="number" placeholder="Enter Your CNIC" value={formData.cnic} onChange={handleChange} />

        <select name="subCategories" className="border border-gray-300 rounded-md p-2 focus:outline-none w-full mt-4" value={formData.subCategories} onChange={handleChange}>
          <option value="">Select Sub Category</option>
          {subCategoriesOptions[formData.categories]?.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
          </div>

        <button onClick={handlePost} className="cursor-pointer bg-blue-600 text-white w-full rounded-md py-2 mt-5">
          {isLoading ? <Spin size="small" style={{ color: "white" }} /> : "Submit"}
        </button>
      </Modal>
    </Sidebar>
  );
}

export default EducationalLoans;
