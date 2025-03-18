 import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Table, Select, Tag, Input, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import saylanilogo from "../assets/image/saylani welfare.png";
import menuItems from "./data";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const countryCityData = {
  Pakistan: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar"],
  India: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai"],
  Bangladesh: ["Dhaka", "Chittagong", "Khulna"],
  SriLanka: ["Colombo", "Kandy", "Galle"],
  Nepal: ["Kathmandu", "Pokhara", "Lalitpur"],
};

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("applications");
  const [recentActivities, setRecentActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [search, setSearch] = useState({ token: "", city: "", country: "" });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activites = await axios.get(`${BASE_URL}/loan/getLoanRequest`);
        const data = Array.isArray(activites.data.data) ? activites.data.data : [];
        const activitiesWithId = data?.map((activity, index) => ({
          ...activity,
          id: activity.id || index + 1,
        }));
        console.log("Fetched Data:", activites.data.data);
        
        setRecentActivities(activitiesWithId);
        setFilteredActivities(activitiesWithId);
        localStorage.setItem("loanRequests", JSON.stringify(activitiesWithId));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const filtered = recentActivities.filter(
      (activity) =>
        (search.token ? activity.token.includes(search.token) : true) &&
        (search.city ? activity.city.toLowerCase() === search.city.toLowerCase() : true) &&
        (search.country ? activity.country.toLowerCase() === search.country.toLowerCase() : true)
    );
    setFilteredActivities(filtered);
  }, [search, recentActivities]);


const updateStatus = async (_id, status) => {
  console.log("updateStatus:", _id, status);
  console.log("id:", _id);
  console.log("status:", status);

  try {
      const response = await axios.put(
          `${BASE_URL}/application/updateApplicationStatus/${_id}`,
          { status: status },
          { headers: { "Content-Type": "application/json" } }
      );

      console.log("updateStatuswithData:", response.data);
      console.log("updateStatus:", response);

      const updatedActivities = recentActivities.map((activity) =>
          activity._id === _id ? { ...activity, status: status } : activity
      );

      setRecentActivities(updatedActivities);
      setFilteredActivities(updatedActivities);
      localStorage.setItem("loanRequests", JSON.stringify(updatedActivities));
  } 
  catch (error) {
      console.log("error.message=>", error.message);
      console.log("error.response=>", error.response);
  }
};


  const handleSearchChange = (key, value) => {
    setSearch((prev) => ({ ...prev, [key]: value, ...(key === "country" ? { city: "" } : {}) }));
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
      >
        <div style={{ height: "64px", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <img src={saylanilogo} alt="Logo" style={{ width: collapsed ? "64px" : "130px", transition: "width 0.2s" }} />
        </div>
                <Menu theme="light" mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: "0 16px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}>
          <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} style={{ fontSize: "16px", width: 64, height: 64 }} />
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "500" }}>Admin Dashboard</h2>
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", minHeight: 280, borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Space style={{ marginBottom: 16, display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Input placeholder="Search by Token" onChange={(e) => handleSearchChange("token", e.target.value)} />
            <Select placeholder="Select Country" style={{ minWidth: 150 }} onChange={(value) => handleSearchChange("country", value)}>
              {Object.keys(countryCityData).map((country) => (
                <Option key={country} value={country}>
                  {country.charAt(0).toUpperCase() + country.slice(1)}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="Select City"
              style={{ minWidth: 150 }}
              onChange={(value) => handleSearchChange("city", value)}
              disabled={!search.country}
            >
              {(countryCityData[search.country] || []).map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Space>
          <Table
          pagination={7}
            dataSource={filteredActivities}
            columns={[
              { title: "Token", dataIndex: "token", key: "token" , render: (token) => (token?.length > 10 ? `${token.substring(0, 10)}...` : token)  },
              { title: "Name", dataIndex: "name", key: "name" },
              { title: "City", dataIndex: "city", key: "city" },
              { title: "Country", dataIndex: "country", key: "country" },
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
                title: "Actions",
                key: "actions",
                render: (_, record) => (
                  <Space>
                    <Button
                      type="primary"
                      icon={<CheckCircleOutlined />}
                      onClick={() => updateStatus(record._id, "Approved")}
                      disabled={record.status !== "Pending"}
                      style={{
                        backgroundColor: record.status === "Pending" ? "" : "#b3d7ff", 
                        borderColor: record.status === "Pending" ? "" : "#b3d7ff",
                        color: record.status === "Pending" ? "" : "#ffffff",
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      type="dashed"
                      danger
                      icon={<CloseCircleOutlined />}
                      onClick={() => updateStatus(record._id, "Rejected")}
                      disabled={record.status !== "Pending"}
                      style={{
                        borderColor: record.status === "Pending" ? "" : "#f7b2b2", 
                        color: record.status === "Pending" ? "" : "#f7b2b2", 
                        background: record.status === "Pending" ? "" : "white", 
                      }}
                    >
                      Reject
                    </Button>
                  </Space>
                ),
              },
            ]}
            rowKey="id"
          />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard; 
