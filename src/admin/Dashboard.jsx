import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Table, Select, Tag, Input, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined,
  DollarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import saylanilogo from "../assets/image/saylani welfare.png";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("applications");
  const [recentActivities, setRecentActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [search, setSearch] = useState({ token: "", city: "", country: "" });

  useEffect(() => {
    const activities = JSON.parse(localStorage.getItem("loanRequests")) || [];

    // Ensure every activity has a unique ID
    const activitiesWithId = activities.map((activity, index) => ({
      ...activity,
      id: activity.id || index + 1, // Assign an ID if missing
    }));

    setRecentActivities(activitiesWithId);
    setFilteredActivities(activitiesWithId);

    // Save updated data with IDs back to localStorage
    localStorage.setItem("loanRequests", JSON.stringify(activitiesWithId));
  }, []);

  useEffect(() => {
    const filtered = recentActivities.filter(
      (activity) =>
        (search.token ? activity.token.includes(search.token) : true) &&
        (search.city
          ? activity.city.toLowerCase().includes(search.city.toLowerCase())
          : true) &&
        (search.country
          ? activity.country
              .toLowerCase()
              .includes(search.country.toLowerCase())
          : true)
    );
    setFilteredActivities(filtered);
  }, [search, recentActivities]);

  const updateStatus = (id, newStatus) => {
    console.log("Updating ID:", id); // Debugging ke liye

    const updatedActivities = recentActivities.map((activity) =>
      activity.id === id ? { ...activity, status: newStatus } : activity
    );

    setRecentActivities(updatedActivities);
    setFilteredActivities(updatedActivities);

    // Update localStorage
    localStorage.setItem("loanRequests", JSON.stringify(updatedActivities));
  };

  const handleSearchChange = (key, value) => {
    setSearch((prev) => ({ ...prev, [key]: value }));
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <AppstoreAddOutlined />,
      label: <Link to={"/user-dashboard"}>User Dashboard</Link>,
    },
    {
      key: "adminDashboard",
      icon: <AppstoreAddOutlined />,
      label: <Link to={"/admin-dashboard"}>Dashboard</Link>,
    },
    {
      key: "loans",
      icon: <DollarOutlined />,
      label: <Link to={"/admin-loanDetails"}>Loan Details</Link>,
    },
    {
      key: "appointments",
      icon: <CalendarOutlined />,
      label: <Link to={"/admin-appointments"}>Appointments</Link>,
    },
  ];

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
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["applications"]}
          selectedKeys={[selectedMenu]}
          items={menuItems}
          style={{ padding: "8px 0" }}
        />
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
          >
            <Input
              placeholder="Search by Token"
              onChange={(e) => handleSearchChange("token", e.target.value)}
            />
            <Select
              placeholder="Select City"
              style={{ minWidth: 120 }}
              onChange={(value) => handleSearchChange("city", value)}
            >
              <Option value="karachi">Karachi</Option>
              <Option value="lahore">Lahore</Option>
              <Option value="islamabad">Islamabad</Option>
            </Select>
            <Select
              placeholder="Select Country"
              style={{ minWidth: 120 }}
              onChange={(value) => handleSearchChange("country", value)}
            >
              <Option value="pakistan">Pakistan</Option>
              <Option value="india">India</Option>
              <Option value="usa">USA</Option>
            </Select>
          </Space>
          <Table
            dataSource={filteredActivities}
            columns={[
              { title: "Token", dataIndex: "token", key: "token" },
              { title: "Name", dataIndex: "name", key: "name" },
              { title: "City", dataIndex: "city", key: "city" },
              { title: "Country", dataIndex: "country", key: "country" },
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
                    {status}
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
                      onClick={() => updateStatus(record.id, "Approved")}
                      style={{
                        opacity: record.status !== "Pending" ? 0.5 : 1,
                        pointerEvents:
                          record.status !== "Pending" ? "none" : "auto",
                      }}
                    >
                      Approve
                    </Button>

                    <Button
                      type="dashed"
                      danger
                      icon={<CloseCircleOutlined />}
                      onClick={() => updateStatus(record.id, "Rejected")}
                      style={{
                        opacity: record.status !== "Pending" ? 0.5 : 1,
                        pointerEvents:
                          record.status !== "Pending" ? "none" : "auto",
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
export const LoansPage = ({ loans }) => {
  const columns = [
    { title: "Loan ID", dataIndex: "id", key: "id" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Subcategory", dataIndex: "subcategory", key: "subcategory" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Pending" ? "orange" : "green"}>{status}</Tag>
      ),
    },
  ];

  const expandedRowRender = (record) => (
    <div>
      <p>
        <strong>Guarantor:</strong> {record.guarantor.name}
      </p>
      <p>
        <strong>User Info:</strong> {record.user.name}, {record.user.phone}
      </p>
    </div>
  );

  return (
    <Table
      dataSource={loans}
      columns={columns}
      expandable={{ expandedRowRender }}
      rowKey="id"
    />
  );
};

export const AppointmentsPage = ({ appointments }) => {
  const dateCellRender = (value) => {
    const listData = appointments.filter(
      (app) =>
        new Date(app.date).toDateString() === value.toDate().toDateString()
    );
    return (
      <ul>
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status="success" text={item.user.name} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};

export default Dashboard;
