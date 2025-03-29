import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import React, { useEffect, useState } from "react";
import { Layout, Button, Table, Select, Tag, Input, Space } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";

const { Option } = Select;

const countryCityData = {
  Pakistan: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar"],
  India: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai"],
  Bangladesh: ["Dhaka", "Chittagong", "Khulna"],
  SriLanka: ["Colombo", "Kandy", "Galle"],
  Nepal: ["Kathmandu", "Pokhara", "Lalitpur"],
};

const Dashboard = () => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [search, setSearch] = useState({ token: "", city: "", country: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const activites = await axios.get(`${BASE_URL}/loan/getLoanRequest`);
        const data = Array.isArray(activites.data.data)
          ? activites.data.data
          : [];
        const activitiesWithId = data?.map((activity, index) => ({
          ...activity,
          id: activity.id || index + 1,
        }));

        setRecentActivities(activitiesWithId);
        setFilteredActivities(activitiesWithId);
        localStorage.setItem("loanRequests", JSON.stringify(activitiesWithId));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = recentActivities.filter(
      (activity) =>
        (search.token ? activity.token.includes(search.token) : true) &&
        (search.city
          ? activity.city.toLowerCase() === search.city.toLowerCase()
          : true) &&
        (search.country
          ? activity.country.toLowerCase() === search.country.toLowerCase()
          : true)
    );
    setFilteredActivities(filtered);
  }, [search, recentActivities]);

  const updateStatus = async (_id, status) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/application/updateApplicationStatus/${_id}`,
        { status: status },
        { headers: { "Content-Type": "application/json" } }
      );

      const updatedActivities = recentActivities.map((activity) =>
        activity._id === _id ? { ...activity, status: status } : activity
      );

      setRecentActivities(updatedActivities);
      setFilteredActivities(updatedActivities);
      localStorage.setItem("loanRequests", JSON.stringify(updatedActivities));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSearchChange = (key, value) => {
    setSearch((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "country" ? { city: "" } : {}),
    }));
  };

  return (
    <Layout className="min-h-screen flex flex-col md:flex-row">
      <Sidebar>
        <div className="p-4">
          <Space
            className="w-full mb-4 flex flex-col sm:flex-row gap-2"
          >
            <Input
              placeholder="Search by Token"
              onChange={(e) => handleSearchChange("token", e.target.value)}
              className="w-full sm:w-auto"
            />
            <Select
              placeholder="Select Country"
              className="w-full sm:w-auto"
              onChange={(value) => handleSearchChange("country", value)}
              style={{ minWidth: 150 }}
            >
              {Object.keys(countryCityData).map((country) => (
                <Option key={country} value={country}>
                  {country.charAt(0).toUpperCase() + country.slice(1)}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="Select City"
              className="w-full sm:w-auto"
              onChange={(value) => handleSearchChange("city", value)}
              disabled={!search.country}
              style={{ minWidth: 150 }}
            >
              {(countryCityData[search.country] || []).map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Space>
          
          <div className="overflow-x-auto">
          <Table
      loading={loading}
      dataSource={filteredActivities}
      columns={[
        {
          title: "Token",
          dataIndex: "token",
          key: "token",
          render: (token) =>
            token?.length > 10 ? `${token.substring(0, 10)}...` : token,
        },
        { 
          title: "Name", 
          dataIndex: "name", 
          key: "name",
          responsive: ["md"] 
        },
        { 
          title: "City", 
          dataIndex: "city", 
          key: "city",
          responsive: ["md"] 
        },
        { 
          title: "Country", 
          dataIndex: "country", 
          key: "country",
          responsive: ["lg"] 
        },
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
          title: "Actions",
          key: "actions",
          render: (_, record) => (
            <Space className="flex flex-wrap gap-2">
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => updateStatus(record._id, "Approved")}
                disabled={record.status !== "Pending"}
                style={{
                  backgroundColor:
                  record.status === "Pending" ? "" : "#b3d7ff",
                  borderColor:
                  record.status === "Pending" ? "" : "#b3d7ff",
                  color: record.status === "Pending" ? "" : "#ffffff",
                }}
              >
                <span className="hidden sm:inline">Approve</span>
              </Button>
              <Button
                type="dashed"
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => updateStatus(record._id, "Rejected")}
                disabled={record.status !== "Pending"}
                style={{
                  borderColor:
                  record.status === "Pending" ? "" : "#f7b2b2",
                  color: record.status === "Pending" ? "" : "#f7b2b2",
                  background: record.status === "Pending" ? "" : "white",
                }}
              >
                <span className="hidden sm:inline">Reject</span>
              </Button>
            </Space>
          ),
        },
      ]}
      rowKey="id"
      scroll={{ x: true }}
      pagination={{
        pageSize: 7,
        responsive: true,
        showSizeChanger: false,
        style: { 
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'nowrap'
        },
        itemRender: (_, type, originalElement) => {
          if (type === 'prev' || type === 'next') {
            return (
              <button className="px-2 py-1 border rounded mx-1 flex items-center justify-center h-8 w-8">
                {type === 'prev' ? '‹' : '›'}
              </button>
            );
          }
          return originalElement;
        }
      }}
       className="min-w-full"
    />
</div>
        </div>
      </Sidebar>
    </Layout>
  );
};

export default Dashboard;