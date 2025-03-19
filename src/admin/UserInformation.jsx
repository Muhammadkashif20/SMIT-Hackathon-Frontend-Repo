import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Table, Layout, Space, Typography, Menu, Button, Result } from "antd";
import saylanilogo from "../assets/image/saylani welfare.png";
import { BASE_URL } from "../utils/baseurl";
import menuItems from "./data";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Header, Sider, Content } = Layout;

const UserInformation = () => {
  const { _id  } = useParams();
  console.log("id=>", _id);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [guarantor, setGuarantor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoGurantors = await axios.get(`${BASE_URL}/guarantor/getGuarantorInfoById/${_id}`);
        console.log("infoGurantorsall=>", infoGurantors.data.data);
        let filterInfo = Object.values(infoGurantors.data.data).find((item) => console.log("item._id=>", item._id) || item._id === _id) || null;        
        console.log("filterInfo=>", filterInfo);
        console.log("filterInfoByUser=>", filterInfo?.user);
        console.log("filterInfoByUser=>", filterInfo?.guarantors);
        
        setUser(filterInfo?.user || null);
        setGuarantor(filterInfo?.guarantors || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [_id]);

  // If data is loading, show loader
  if (loading) {
    return (
      <Result
        status="info"
        title="Fetching Data..."
        subTitle="Please wait while we retrieve the user details."
      />
    );
  }

  // If user data is not found, show 404 page
  if (!user && (!guarantor || guarantor.length === 0)) {
    return (
      <Result
        status="404"
        title="User Not Found"
        subTitle="The requested user does not exist."
        extra={
          <Button type="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        }
      />
    );
  }

  const userColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Location", dataIndex: "address", key: "address" },
  ];

  const guarantorColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "CNIC", dataIndex: "cnic", key: "cnic" },
    { title: "Location", dataIndex: "location", key: "location" },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#eef2f6" }}>
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
            background: "#fff",
            margin: "24px 16px",
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={3} style={{ color: "#155DFC" }}>
              User Information
            </Title>
            <Table
              columns={userColumns}
              dataSource={user ? [user] : []}
              pagination={false}
              bordered
            />

            <Title level={3} style={{ color: "#155DFC" }}>
              Guarantor Information
            </Title>
            <Table
              columns={guarantorColumns}
              dataSource={guarantor}
              pagination={false}
              bordered
            />
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserInformation;
