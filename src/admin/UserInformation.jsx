import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Table, Layout, Space, Typography, Button, Result, message } from "antd";
import { BASE_URL } from "../utils/baseurl";
import Sidebar from "./Sidebar";
const { Title } = Typography;

const UserInformation = () => {
  const { _id  } = useParams();
  console.log("id=>", _id);
  const [user, setUser] = useState(null);
  const [guarantor, setGuarantor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await axios.get(`${BASE_URL}/guarantor/getGuarantorInfo`);
        const userId= userInfo.data.data.user._id
        console.log("User Data =>", userInfo.data.data);
          // console.log("User.id =>", userId);
        const infoGurantors = await axios.get(`${BASE_URL}/guarantor/getGuarantorInfoById/${userId}`);
        console.log("Guarantor Data =>", infoGurantors.data);
        let filterInfo = Object.values(infoGurantors.data).find((item) => 
          item._id === _id
        ) || null;       

        console.log("Filtered User Info =>", filterInfo);
        console.log("Filtered Guarantor Info =>", filterInfo?.guarantors);

        setUser(filterInfo?.user || null);
        setGuarantor(filterInfo?.guarantors || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [us]);

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
      <Sidebar>
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
          </Sidebar>
    </Layout>
  );
};

export default UserInformation;
