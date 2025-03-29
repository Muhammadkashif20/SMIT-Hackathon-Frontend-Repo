import React, { useEffect, useState } from "react";
import { Layout, Table, Space, Typography, Button, Result, message } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import Sidebar from "./Sidebar";

const { Title } = Typography;

const UserInformation = () => {
  const { _id } = useParams();
  const [user, setUser] = useState(null);
  const [guarantor, setGuarantor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await axios.get(`${BASE_URL}/guarantor/getGuarantorInfoById/${_id}`);
        console.log("Data=>",user.data.data);
        let userData = user.data.data.user || null;
        let guarantorData = user.data.data.guarantors || [];
        console.log("userData=>",userData || null);
        console.log("guarantorData=>",guarantorData || []);
        setUser(userData || null);
        setGuarantor(guarantorData || []);
      } catch (error) {
        message.error("Error fetching user information");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [_id]);

  if (loading) {
    return <Result status="info" title="Fetching Data..." subTitle="Please wait while we retrieve the user details." />;
  }

  if (!user && guarantor.length === 0) {
    return <Result status="404" title="User Not Found" subTitle="The requested user does not exist." extra={<Button type="primary" onClick={() => window.history.back()}>Go Back</Button>} />;
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#eef2f6" }}>
      <Sidebar>
        <Space direction="vertical" style={{ width: "100%", padding: "16px" }}>
          <Title level={3} style={{ color: "#155DFC" }}>User Information  🆔</Title>
          <Table 
            columns={[
              { title: "Name", dataIndex: "name", key: "name" }, 
              { title: "Email", dataIndex: "email", key: "email" }, 
              { title: "Phone", dataIndex: "phone", key: "phone" }, 
              { title: "Location", dataIndex: "address", key: "address" }
            ]} 
            dataSource={user ? [user] : []} 
            pagination={false} 
            bordered
            scroll={{ x: true }}
          />
          <Title level={3} style={{ color: "#155DFC" }}>Guarantor's Information 🛡️</Title>
          <Table 
            columns={[
              { title: "Name", dataIndex: "name", key: "name" }, 
              { title: "Email", dataIndex: "email", key: "email" }, 
              { title: "CNIC", dataIndex: "cnic", key: "cnic" }, 
              { title: "Location", dataIndex: "location", key: "location" }
            ]} 
            dataSource={guarantor} 
            pagination={false} 
            bordered
            scroll={{ x: true }}
          />
        </Space>
      </Sidebar>
    </Layout>
  );
};

export default UserInformation;