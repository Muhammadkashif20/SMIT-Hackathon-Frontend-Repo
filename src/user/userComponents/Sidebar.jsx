import React, { useState } from "react";
import MainLogo from "../../assets/image/saylani welfare.jpeg";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const { Sider } = Layout;

const Sidebar = () => {

  const isSmallDevice = useMediaQuery({ maxWidth: 640 });
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
    <Layout  style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsedState) => setCollapsed(collapsedState)}
        className="shadow-lg"
        defaultCollapsed ={true}
        collapsedWidth={isSmallDevice ? 50 : 60}
        theme="light"
        width={250}
      >
        <div className="logo my-3 flex justify-center items-center p-4" style={{ color: "black", fontSize: "20px" }}>
          <img src={MainLogo} alt="" className="w-40" />
        </div>
        <Menu theme="light" mode="inline" >
          <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
            <Link to="/user/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.SubMenu key="loan" icon={<FileTextOutlined />} title="Loans">
                      <Menu.Item key="weddingLoan">
                        <Link to="user/wedding-loan">Wedding Loan</Link>
                      </Menu.Item>
                      <Menu.Item key="homeLoan">
                        <Link to="user/home-loan">Home Construction Loans</Link>
                      </Menu.Item>
                      <Menu.Item key="businessLoan">
                        <Link to="user/startup-loan">Business Startup Loans</Link>
                      </Menu.Item>
                      <Menu.Item key="educationLoan">
                        <Link to="user/education-loan">Education Loans</Link>
                      </Menu.Item>
                    </Menu.SubMenu>
                    {/* Statistics Link */}
                    <Menu.Item key="statistics" icon={<BarChartOutlined />}>
                      <Link to="user/statistics">Statistics</Link>
                    </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
        </div>
  );
};

export default Sidebar;