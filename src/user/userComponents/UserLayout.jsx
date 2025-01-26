import { useState } from "react";
import { Layout, Menu, Button, Avatar } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  BankOutlined,
  HomeOutlined,
  CarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined,
  DollarOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const UserLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      icon: <AppstoreAddOutlined />,
      label: <Link to={"/user"}>Dashbaord</Link>,
    },
    {
      key: "loans",
      label: "Loans",
      children: [
        {
          key: "/weddingloans",
          icon: <UserOutlined />,
          label: <Link to={"/weddingloans"}>Wedding Loan</Link>,
        },
        {
          key: "/constructionloans",
          icon: <BankOutlined />,
          label: <Link to={"/constructionloans"}>Home Construction Loans</Link>,
        },
        {
          key: "/bussinessloans",
          icon: <DollarOutlined />,
          label: <Link to={"/bussinessloans"}>Business Startup Loans</Link>,
        },
        {
          key: "/educationloans",
          icon: <BookOutlined />,
          label: <Link to={"/educationloans"}> Education Loans</Link>,
        },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.15) ",
        }}
      >
        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="p-8"
        >
            {
            collapsed 
            ? "SMA" 
            : <img width={'180px'} src={"https://www.saylaniwelfare.com/static/media/logo_saylaniwelfare.22bf709605809177256c.png"} alt="Logo"/>
        }
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/"]}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={["loans"]}
          items={menuItems}
        >
          {menuItems.map((item) => {
            if (item.children) {
              return (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                >
                  {item.children.map((child) => (
                    <Menu.Item key={child.key} icon={child.icon}>
                      <Link to={child.key}>{child.label}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            }
            return (
              <Menu.Item key={item.key} icon={item.icon} >
                <Link to={item.key}>{item.label}</Link>
              </Menu.Item>
            );
          })}
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
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* <Button type="primary">Loan Details</Button> */}
            <Link to={"/login"}><Button type="primary">Login</Button></Link>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;