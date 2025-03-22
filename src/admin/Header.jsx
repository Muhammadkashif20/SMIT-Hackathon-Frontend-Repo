import { Button, Layout, message } from "antd";
import React, { useState } from "react";
const { Header } = Layout;
import { Link, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
const Headers = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("fullname");
  
  return (
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
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {token ? (
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "500" }}>
                  {`${userName}`}
                </h2>
                <button
        onClick={() => {
          message.success("Logout Successfully!");
          navigate("/login");
          localStorage.removeItem("token");
          console.log("logout Successfully=>", localStorage.removeItem("token"));
          
        }}
        className="cursor-pointer text-white font-semibold rounded-md py-1 px-3 text-lg"
        style={{ background: "#386BC0"}}

      >
        Logout
      </button>
              </div>
              
            )  : (
              <Link to={"/login"}>
                <Button
                  type="primary"
                  style={{ background: "#52c41a", borderColor: "#52c41a" }}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </Header>
  );
};

export default Headers;
