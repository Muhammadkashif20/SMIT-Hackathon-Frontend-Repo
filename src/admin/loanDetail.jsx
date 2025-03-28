import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import React, { useEffect, useState } from "react";
import { Layout,Table, Tag, Space } from "antd";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
const LoanDetail = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [guarantors, setGuarantors] = useState([]);
  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Category", dataIndex: "categories", key: "categories" },
    { title: "Subcategory", dataIndex: "subCategories", key: "subCategories" },
    { title: "Amount", dataIndex: "maximumloan", key: "maximumloan" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Pending"
              ? "orange"
              : status === "Rejected"
              ? "red"
              : "green"
          }
        >
          {status || "N/A"}
        </Tag>
      ),
    },
    {
      title: "Detail",
      key: "detail",
      render: (_, record, index) => (
        <button
          onClick={() => {
             navigate(`/user-information/${record._id}`);
             console.log("record=>", record._id);
          }}
          style={{
            background: "#155DFC",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Detail
        </button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/loan/getLoanRequest`);
        const gurantorsRes = await axios.get(`${BASE_URL}/guarantor/getGuarantorInfo`);

        console.log("gurantorsRes=>", gurantorsRes.data.data);
        // console.log("gurantorsRes.user=>", gurantorsRes.data.data[0].user);
        gurantorsRes.data.data.forEach((item, index) => {
          // console.log(`User ${index + 1}:`, item.user);
      }); 
      
        console.log("res=>", res.data.data);
        setLoans(res.data.data);
        setGuarantors(gurantorsRes.data.data);        
      } catch (error) {
        console.log("Error fetching data=>", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Sidebar>
          <Space
            style={{
              marginBottom: 16,
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          ></Space>
          <h2
            style={{
              marginBottom: "22px",
              color: "#386BC0",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {" "}
            Loan Details{" "}
          </h2>
          <Table
            columns={columns}
            dataSource={loans.map((loan,index) => ({
              key: loan._id,
              email: loan.email,
              categories: loan.categories,
              subCategories: loan.subCategories,
              maximumloan: loan.maximumloan,
              status: loan.status,
              _id: loan._id,
            }))}
            pagination={{ pageSize: 8 }}
            />
    </Sidebar>
    </Layout>
  );
};

export default LoanDetail;
