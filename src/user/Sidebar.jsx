import { useState, useEffect } from "react";
import { Layout, Menu, Button, message } from "antd";
import {
  UserOutlined,
  BankOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined,
  DollarOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import saylanilogo from "../assets/image/saylani welfare.png";

const { Header, Sider, Content } = Layout;

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // ✅ Automatically collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      key: "dashboard",
      icon: <AppstoreAddOutlined />,
      label: <Link to={"/user-dashboard"}>Dashboard</Link>,
    },
    {
      key: "loans",
      label: "Loans",
      icon: <BankOutlined />,
      children: [
        { key: "weddingloans", icon: <UserOutlined />, label: <Link to={"/weddingloans"}>Wedding Loan</Link> },
        { key: "constructionloans", icon: <BankOutlined />, label: <Link to={"/constructionloans"}>Home Construction Loans</Link> },
        { key: "businessloans", icon: <DollarOutlined />, label: <Link to={"/businessloans"}>Business Startup Loans</Link> },
        { key: "educationloans", icon: <BookOutlined />, label: <Link to={"/educationloans"}>Education Loans</Link> },
      ],
    },
  ];

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("fullname");

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
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/"]}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={["loans"]}
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
          <h2 className="m-0 text-sm md:text-lg lg:text-[1.2rem] xl:4xl hidden sm:block" style={{fontWeight:"500"}}>User Site  👤 </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {token ? (
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <h2 className="m-0 text-sm md:text-lg lg:text-[1.2rem] xl:4xl" style={{fontWeight:"500"}} >{userName}</h2>
                <button
                  onClick={() => {
                    message.success("Logout Successfully!");
                    navigate("/login");
                    localStorage.removeItem("token");
                  }}
                  className="cursor-pointer text-white font-semibold rounded-md py-1 px-3 text-lg"
                  style={{ background: "#386BC0" }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to={"/login"}>
                <Button type="primary" style={{ background: "#52c41a", borderColor: "#52c41a" }}>Login</Button>
              </Link>
            )}
          </div>
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
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
