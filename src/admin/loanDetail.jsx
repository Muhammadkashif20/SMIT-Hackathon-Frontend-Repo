import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
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

const LoanDetail = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("applications");
  const [recentActivities, setRecentActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);

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
            style={{ width: collapsed ? "64px" : "130px", transition: "width 0.2s" }}
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedMenu]}
          style={{ padding: "8px 0" }}
        >
          <Menu.Item key="dashboard" icon={<AppstoreAddOutlined />}>
            <Link to={"/user-dashboard"}>User Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="adminDashboard" icon={<AppstoreAddOutlined />}>
            <Link to={"/admin-dashboard"}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="loans" icon={<DollarOutlined />}>
            <Link to={"/admin-loandetail"}>Loan Details</Link>
          </Menu.Item>
          <Menu.Item key="appointments" icon={<CalendarOutlined />}>
            <Link to={"/admin-appointments"}>Appointments</Link>
          </Menu.Item>
        </Menu>
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
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "500" }}>Admin Dashboard</h2>
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
            style={{ marginBottom: 16, display: "flex", gap: "8px", flexWrap: "wrap" }}
          ></Space>
          <Table
            dataSource={filteredActivities}
            columns={[
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
              {
                title: "Actions",
                key: "actions",
                render: (_, record) => (
                  <Space>
                    <Button
                      type="primary"
                      icon={<CheckCircleOutlined />}
                      onClick={() => updateStatus(record.id, "Approved")}
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
                      onClick={() => updateStatus(record.id, "Rejected")}
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

export default LoanDetail;
