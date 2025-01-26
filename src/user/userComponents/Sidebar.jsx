import React, { useState } from "react";

import { Layout, Menu } from "antd";
import {
    AppstoreOutlined,
    FileTextOutlined,
    BarChartOutlined,
  } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";

const { Sider } = Layout;

function Sidebar(){

//   const isSmallDevice = useMediaQuery({ maxWidth: 640 });

  const [collapsed, setCollapsed] = useState(true);

  const handleMenuClick = () => {
    setCollapsed(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsedState) => setCollapsed(collapsedState)}
      className="shadow-lg border-r pt-10 border-gray-300"
      defaultCollapsed={true}
      theme="light"
      width={250}
      style={{
        backgroundColor: "#ffffff", // White background for sidebar
      }}
    >
      <Menu
        theme="light"
        mode="inline"
        onClick={handleMenuClick}
        style={{
          backgroundColor: "#ffffff", // White background
          color: "#1E3A8A", // Blue text color
          borderRight: "none", // Remove right border for clean look
        }}
      >
        <Menu.Item
          key="/userdashboard"
          icon={<AppstoreOutlined style={{ color: "#1E3A8A" }} />}
          style={{
            fontWeight: "600",
            color: "#1E3A8A", // Blue color for text and icons
          }}
        >
          <Link to="/userdashboard" style={{ color: "#1E3A8A" }}>
            Dashboard
          </Link>
        </Menu.Item>

        <Menu.SubMenu
          key="assignments"
          icon={<FileTextOutlined style={{ color: "#1E3A8A" }} />}
          title="Loan List"
          style={{ fontWeight: "600" }}
        >
          <Menu.Item key="wedding-loan">
            <Link
              to="/weddingloans"
              style={{
                color: "#1E3A8A",
                fontWeight: "600",
              }}
            >
              Wedding Loans
            </Link>
          </Menu.Item>
          <Menu.Item key="house-loan">
            <Link
              to="/constructionloans"
              style={{
                color: "#1E3A8A",
                fontWeight: "600",
              }}
            >
              Home Construction Loan
            </Link>
          </Menu.Item>
          <Menu.Item key="business-loan">
            <Link
              to="/bussinessloans"
              style={{
                color: "#1E3A8A",
                fontWeight: "600",
              }}
            >
              Business Startup Loans
            </Link>
          </Menu.Item>
          <Menu.Item key="business-loan">
            <Link
              to="/educationloans"
              style={{
                color: "#1E3A8A",
                fontWeight: "600",
              }}
            >
              Education Loans
            </Link>
          </Menu.Item>
          <Menu.Item key="education-loan">
            <Link
              to="/student/feedback"
              style={{
                color: "#1E3A8A",
                fontWeight: "600",
              }}
            >
              Education Loan
            </Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item
          key="profile"
          icon={<BarChartOutlined style={{ color: "#1E3A8A" }} />}
          style={{ fontWeight: "600" }}
        >
          <Link to="/student/statistics" style={{ color: "#1E3A8A" }}>
            Statistics
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  </Layout>
  );
};

export default Sidebar;