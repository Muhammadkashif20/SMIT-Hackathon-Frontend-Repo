import { useState } from "react";
import Sidebar from "./Sidebar";
import { Modal, Table, message, Spin } from 'antd';
import { BASE_URL } from "../utils/baseurl";

function WeddingLoans() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subcategory: '',
    maxLoan: '',
    loanPeriod: ''
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [maximumLoan, setMaximumLoan] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");

  const [isLoading, setIsLoading] = useState(false); // Spinner loading state
  const [loanRequests, setLoanRequests] = useState([
    {
      name: "John Doe",
      email: "john.doe@example.com",
      subcategory: "Valima",
      maxLoan: "50000",
      loanPeriod: "5",
      status: "Pending"
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      subcategory: "Furniture",
      maxLoan: "30000",
      loanPeriod: "3",
      status: "Approved"
    },
    {
      name: "Sarah Connor",
      email: "sarah.connor@example.com",
      subcategory: "Jahez",
      maxLoan: "70000",
      loanPeriod: "7",
      status: "Rejected"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePost = async () => {
    // Field validation
    if (!name || !email || !subcategory || !maximumLoan || !loanPeriod) {
      message.error("Please fill all fields.");
      return;
    }

    setIsLoading(true); // Start loading spinner

    try {
      let postReq = await fetch(
        `${BASE_URL}/addLoanRequest`,
        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            subcategories: subcategory,
            maximumloan: maximumLoan,
            loanperiod: loanPeriod
          }),
        }
      );
      console.log('status', postReq);

      // Adding the loan request to the table after submission
      setLoanRequests([
        ...loanRequests,
        { name, email, subcategory, maxLoan: maximumLoan, loanPeriod, status: 'Pending' }
      ]);

      message.success("Loan Request Submitted");

      // Close modal and reset form
      setIsModalOpen(false);
      setIsModalOpen(false);
      setName('');
      setEmail('');
      setSubcategory('');
      setMaximumLoan('');
      setLoanPeriod('');
      setFormData({ name: '', email: '', subcategory: '', maxLoan: '', loanPeriod: '' });
    } catch (error) {
      console.error("Error fetching", error);
      message.error("Failed to submit loan request");
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Subcategory', dataIndex: 'subcategory', key: 'subcategory' },
    { title: 'Maximum Loan', dataIndex: 'maxLoan', key: 'maxLoan' },
    { title: 'Loan Period (Years)', dataIndex: 'loanPeriod', key: 'loanPeriod' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return (
    <>
      <Sidebar>
        <div className="flex justify-between">
          <h1 className="text-center text-blue-600 text-2xl font-bold">Wedding Loan</h1>
          <button
            onClick={showModal}
            className="cursor-pointer bg-blue-600 text-white font-semibold rounded-md py-1.5 px-6 text-lg"
          >
            Get Loan
          </button>
        </div>

        {/* Table to display loan data using Ant Design's Table component */}
        <div className="mt-6">
          <Table
            columns={columns}
            dataSource={loanRequests}
            rowKey={(record) => record.email} // You can use a unique identifier like email or index
          />
        </div>

        {/* Modal for loan application */}
        <Modal title="Wedding Loan" onCancel={handleCancel} open={isModalOpen} onOk={handlePost} footer={null}>
          <div className="flex gap-3 pt-5 justify-between">
            <input
              name="name"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              name="email"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pt-5">
            <select
              name="subcategory"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option value="">Subcategories</option>
              <option value="Valima">Valima</option>
              <option value="Furniture">Furniture</option>
              <option value="Valima Food">Valima Food</option>
              <option value="Jahez">Jahez</option>
            </select>
          </div>
          <div className="flex gap-3 pt-5 pb-3 justify-between">
            <input
              name="maxLoan"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              type="number"
              placeholder="Enter Maximum Loan"
              value={maximumLoan}
              onChange={(e) => setMaximumLoan(e.target.value)}
            />
            <input
              name="loanPeriod"
              className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
              type="number"
              placeholder="Enter Loan Period In Years"
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(e.target.value)}
            />
          </div>
          <div className="pt-5">
            <button
              onClick={handlePost}
              className="cursor-pointer bg-blue-600 text-white w-full rounded-md py-2"
            >
              {isLoading ? <Spin  size="small" style={{ color: "white", marginRight: 10 }}/> : "Submit"}
            </button>
          </div>
        </Modal>
      </Sidebar>
    </>
  );
}

export default WeddingLoans;
