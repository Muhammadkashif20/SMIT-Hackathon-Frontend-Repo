import React, { useState } from "react";
import MainLogo from "../assets/image/Smit Logo.png";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  UserOutlined,
  FileTextOutlined,
  NotificationOutlined,
  BarChartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const { Sider } = Layout;

const SideBarMenu = () => {
  const isSmallDevice = useMediaQuery({ maxWidth: 640 });

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
        className="shadow-lg"
        defaultCollapsed={true}
        collapsedWidth={isSmallDevice ? 50 : 60}
        theme="light"
        width={250}
      >
        <div
          className="logo my-3 flex justify-center items-center p-4"
          style={{ color: "black", fontSize: "20px" }}
        >
          <img src={MainLogo} alt="Logo" className="w-24" />
        </div>
        <Menu theme="light" mode="inline" onClick={handleMenuClick}>
          {/* Dashboard Link */}
          <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>

          {/* Home Link */}
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          {/* Loans Submenu */}
          <Menu.SubMenu key="loan" icon={<FileTextOutlined />} title="Loans">
            <Menu.Item key="weddingLoan">
              <Link to="/wedding-loan">Wedding Loan</Link>
            </Menu.Item>
            <Menu.Item key="homeLoan">
              <Link to="/home-loan">Home Construction Loans</Link>
            </Menu.Item>
            <Menu.Item key="businessLoan">
              <Link to="/startup-loan">Business Startup Loans</Link>
            </Menu.Item>
            <Menu.Item key="educationLoan">
              <Link to="/education-loan">Education Loans</Link>
            </Menu.Item>
          </Menu.SubMenu>
          {/* Statistics Link */}
          <Menu.Item key="statistics" icon={<BarChartOutlined />}>
            <Link to="/statistics">Statistics</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default SideBarMenu;
