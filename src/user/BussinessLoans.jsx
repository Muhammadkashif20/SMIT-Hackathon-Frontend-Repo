import { useState, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import { Modal, Table, message, Spin } from "antd";
import { BASE_URL } from "../utils/baseurl";
import axios from "axios";

function BussinessLoans() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    categories: "",
    maximumloan: "",
    loanperiod: "",
  });
  const [loanRequests, setLoanRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const savedLoans = JSON.parse(localStorage.getItem("loanRequests")) || [];
    setLoanRequests(savedLoans);
  }, []);
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
    const { name, email, categories, maximumloan, loanperiod } = formData;

    if (!name || !email || !categories || !maximumloan || !loanperiod) {
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
        maximumloan: "",
        loanperiod: "",
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
    { title: "categories", dataIndex: "categories", key: "categories" },
    { title: "Maximum Loan", dataIndex: "maximumloan", key: "maximumloan" },
    {
      title: "Loan Period (Years)",
      dataIndex: "loanperiod",
      key: "loanperiod",
    },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <>
      <Sidebar>
        <div className="flex justify-between mb-6">
          <h1 className="text-center text-blue-600 text-2xl font-bold">
            Business Loans
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
          <div className="flex gap-3 pt-5 justify-between">
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

          <div className="pt-5">
            <select
              name="categories"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              value={formData.categories}
              onChange={handleChange}
              aria-label="Select Loan categories"
            >
              <option value="">Select categories</option>
              <option value="Valima">Valima</option>
              <option value="Furniture">Furniture</option>
              <option value="Valima Food">Valima Food</option>
              <option value="Jahez">Jahez</option>
            </select>
          </div>

          <div className="flex gap-3 pt-5 pb-3 justify-between">
            <input
              name="maximumloan"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              type="number"
              placeholder="Enter Maximum Loan"
              value={formData.maximumloan}
              onChange={handleChange}
              maxLength={7}
              aria-label="Maximum Loan"
            />
            <select
              name="loanperiod"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              value={formData.loanperiod}
              onChange={handleChange}
              aria-label="Loan Period (Years)"
            >
              <option value="">Select Loan Period</option>
              {[1, 2, 3, 4, 5].map((year) => (
                <option key={year} value={year}>
                  {year} Year{year > 1 && "s"}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-5">
            <button
              onClick={handlePost}
              className="cursor-pointer bg-blue-600 text-white w-full rounded-md py-2"
            >
              {isLoading ? (
                <Spin
                  size="small"
                  style={{ color: "white", marginRight: 10 }}
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </Modal>
      </Sidebar>
    </>
  );
}

export default BussinessLoans;
