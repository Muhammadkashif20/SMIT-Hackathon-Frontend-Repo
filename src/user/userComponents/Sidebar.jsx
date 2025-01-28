import { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  BankOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined,
  DollarOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import saylanilogo from "../..//assets/image/saylani welfare.jpeg";
const { Header, Sider, Content } = Layout;

const Sidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      key: "dashbaord",
      icon: <AppstoreAddOutlined />,
      label: <Link to={"/user"}>Dashbaord</Link>,
    },
    {
      key: "loans",
      label: "Loans",
      children: [
        {
          key: "weddingloans",
          icon: <UserOutlined />,
          label: <Link to={"/weddingloans"}>Wedding Loan</Link>,
        },
        {
          key: "constructionloans",
          icon: <BankOutlined />,
          label: <Link to={"/constructionloans"}>Home Construction Loans</Link>,
        },
        {
          key: "bussinessloans",
          icon: <DollarOutlined />,
          label: <Link to={"/bussinessloans"}>Business Startup Loans</Link>,
        },
        {
          key: "educationloans",
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
            ? <img width={'180px'} src={saylanilogo} alt="Logo"/>
            : <img width={'180px'} src={saylanilogo} alt="Logo"/>
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
            <Link to={"/login"}><Button type="primary" className="bg-green-600 hover:bg-green-500">Login</Button></Link>
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

export default Sidebar;