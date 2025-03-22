import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Table, Layout, Space, Typography, Button, Result } from "antd";
import { BASE_URL } from "../utils/baseurl";
import Sidebar from "./Sidebar";
import Headers from "./Header";
const { Title } = Typography;
const { Content } = Layout;

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

  if (loading) {
    return (
      <Result
        status="info"
        title="Fetching Data..."
        subTitle="Please wait while we retrieve the user details."
      />
    );
  }

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
      <Sidebar/>
      <Layout>
        <Headers/>
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
