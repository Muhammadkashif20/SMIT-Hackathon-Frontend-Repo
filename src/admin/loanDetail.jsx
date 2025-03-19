import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Table, Tag, Space } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import saylanilogo from "../assets/image/saylani welfare.png";
import menuItems from "./data";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LoanDetail = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loans, setLoans] = useState([]);
  const [guarantors, setGuarantors] = useState([]);
  const navigate = useNavigate();
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
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
      >
        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <img
            src={saylanilogo}
            alt="Logo"
            style={{
              width: collapsed ? "64px" : "130px",
              transition: "width 0.2s",
            }}
          />
        </div>
        <Menu theme="light" mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "500" }}>
            Admin Dashboard
          </h2>
        </Header>
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
              color: "#155DFC",
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
