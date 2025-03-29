import React, { useEffect, useState } from "react";
import { Layout, Table, Tag, Space, Typography, Button, Result, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import Sidebar from "./Sidebar";

const { Title } = Typography;

const LoanDetail = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/loan/getLoanRequest`);
        console.log("loanData",res.data.data)
        setLoans(res.data.data);
      } catch (error) {
        message.error("Error fetching loan data");
      }
    };
    fetchData();
  }, []);

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
        <Tag color={status === "Pending" ? "orange" : status === "Rejected" ? "red" : "green"}>
          {status || "N/A"}
        </Tag>
      ),
    },
    {
      title: "Detail",
      key: "detail",
      render: (_, record) => (
        <Button type="primary" onClick={() => navigate(`/user-information/${record._id}`)}>
          Detail
        </Button>
      ),
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Sidebar>
        <Title level={3} style={{ color: "#155DFC" }}>Loan Details</Title>
        <Table columns={columns} dataSource={loans} pagination={{ pageSize: 8 }} rowKey="_id" />
      </Sidebar>
    </Layout>
  );
};
export default LoanDetail;