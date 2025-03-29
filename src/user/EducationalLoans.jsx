import { useState, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import { Modal, Table, message, Spin, Tag } from "antd";
import { BASE_URL } from "../utils/baseurl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EducationalLoans() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleGurantor = () => {
    navigate("/guarantors");
  };
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
    Fees: ["University Fees", "Child Fees", "School Fees"],
    StudyMaterials: ["Books", "Stationery", "Online Courses"],
    TechnologyEquipment: ["Laptop", "Tablet", "Software Subscriptions"],
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

  const showModal = () => {
    if (!token) {
      message.error("Please Login First");
      return;
    }
    setIsModalOpen(true);
  };
  
  const handleCancel = () => setIsModalOpen(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handlePost = async () => {
    const {
      name,
      email,
      cnic,
      loanType,
      categories,
      subCategories,
      maximumloan,
      loanperiod,
      city,
      country,
    } = formData;
    if (
      !name ||
      !email ||
      !cnic ||
      !loanType ||
      !categories ||
      !subCategories ||
      !maximumloan ||
      !loanperiod ||
      !city ||
      !country
    ) {
      message.error("Please fill all fields.");
      return;
    }
      else{
        message.success("Loan Request Has Subitted Successfully");
      }

    setIsLoading(true);
    try {
      console.log("loanRequests=>", loanRequests);
      const newLoanRequest = {
        id: loanRequests.length + 1,
        ...formData,
        status: "Pending",
      };
      const res=await axios.post(`${BASE_URL}/loan/addLoanRequest`, newLoanRequest);
        console.log("res=>", res.data);
      const updatedLoanRequests = [...loanRequests, newLoanRequest];
      localStorage.setItem("loanRequests", JSON.stringify(updatedLoanRequests));
      setLoanRequests(updatedLoanRequests);
      setIsModalOpen(false);
      setFormData({
        name: "",
        email: "",
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
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Loan Type", dataIndex: "loanType", key: "loanType" },
    { title: "Categories", dataIndex: "categories", key: "categories" },
    { title: "Maximum Loan", dataIndex: "maximumloan", key: "maximumloan" },
    {
      title: "Loan Period (Years)",
      dataIndex: "loanperiod",
      key: "loanperiod",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "Pending"
            ? "orange"
            : status === "Approved"
            ? "green"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const bothClickLoanSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.cnic ||
      !formData.loanType ||
      !formData.categories ||
      !formData.subCategories ||
      !formData.maximumloan ||
      !formData.loanperiod ||
      !formData.city ||
      !formData.country
    ) {
      message.error("Please fill all fields.");
      return;
    }
    handleGurantor();
    handlePost();
  };
  
  return (
    <Sidebar>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 px-4 md:px-0">
        <h1 className="text-center md:text-left text-[#386BC0] text-2xl font-bold mb-4 md:mb-0">
          Educational Loans  🎓
        </h1>
        <button
          onClick={showModal}
          className="cursor-pointer text-white font-semibold rounded-md py-2 px-4 text-lg w-full md:w-auto"
          style={{ background: "#386BC0" }}
        >
          Get Loan
        </button>
      </div>

      <div className="overflow-x-auto px-4 md:px-0">
      <Table
      columns={columns}
      dataSource={loanRequests}
      rowKey={(record) => record.email}
      pagination={{
        pageSize: 7,
        showSizeChanger: false,
        responsive: true,
        style: { 
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'nowrap'
        },
        itemRender: (_, type, originalElement) => {
          if (type === 'prev' || type === 'next') {
            return (
              <button className="px-3 py-1 border rounded-md mx-1">
                {type === 'prev' ? '‹' : '›'}
              </button>
            );
          }
          return originalElement;
        }
      }}
      scroll={{ x: true }}
      className="min-w-full"
    />
    </div>
      <Modal
        title="Educational Loan"
        onCancel={handleCancel}
        open={isModalOpen}
        footer={null}
        width="90%"
        className="max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          <div className="w-full">
            <input
              name="name"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              type="text"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <input
              name="email"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              type="text"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="w-full">
            <select
              name="country"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              {Object.keys(countryCityMap).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <select
              name="city"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.country}
            >
              <option value="">Select City</option>
              {formData.country &&
                countryCityMap[formData.country].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="w-full">
            <select
              name="loanType"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              value={formData.loanType}
              onChange={handleChange}
            >
              <option value="">Select Loan Type</option>
              <option value="Educational Loan">Educational Loan</option>
            </select>
          </div>
          <div className="w-full">
            <select
              name="categories"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              value={formData.categories}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Fees">Fees</option>
              <option value="StudyMaterials">Study Materials</option>
              <option value="TechnologyEquipment">Technology & Equipment</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="w-full">
            <input
              name="maximumloan"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              type="number"
              placeholder="Enter Maximum Loan Amount"
              value={formData.maximumloan}
              onChange={handleChange}
              aria-label="Enter Maximum Loan Amount"
            />
          </div>
          <div className="w-full">
            <select
              name="loanperiod"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              value={formData.loanperiod}
              onChange={handleChange}
            >
              <option value="">Select Loan Period</option>
              {[...Array(7)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{`${i + 1} Year${
                  i + 1 > 1 ? "s" : ""
                }`}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="w-full">
            <input
              name="cnic"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              type="number"
              placeholder="Enter Your CNIC"
              value={formData.cnic}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <select
              name="subCategories"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              value={formData.subCategories}
              onChange={handleChange}
            >
              <option value="">Select Sub Category</option>
              {subCategoriesOptions[formData.categories]?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={bothClickLoanSubmit}
          disabled={isLoading}
          className={`cursor-pointer ${
            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white w-full rounded-md py-3 mt-6 transition duration-200`}
        >
          {isLoading ? (
            <Spin size="small" style={{ color: "white" }} />
          ) : (
            "Submit"
          )}
        </button>
      </Modal>
    </Sidebar>
  );
}

export default EducationalLoans;