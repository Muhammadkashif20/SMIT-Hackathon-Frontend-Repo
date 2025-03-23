import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import React, { useEffect, useState } from "react";
import { Layout,Table, Tag, Space } from "antd";
import Sidebar from "./Sidebar";
import Headers from "./Header";
const {Content } = Layout;
const LoanDetail = () => {
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
            // if (guarantorId) {
            // } else {
            //   console.log("Guarantor ID not found");
            // }
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
        
        setLoans(res.data.data);
        setGuarantors(gurantorsRes.data.data);
        console.log("res=>", res.data.data);
        console.log("guarantorMap=>", gurantorsRes.data.data);
        
      } catch (error) {
        console.log("Error fetching data=>", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Sidebar/>
      <Layout>
     <Headers/>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
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
        </Content>
      </Layout>
    </Layout>
  );
};

export default LoanDetail;
