import { Button, Layout, message } from "antd";
import React, { useState } from "react";
const { Header } = Layout;
import { MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Headers = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
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
        icon={collapsed ? <MenuFoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{ fontSize: "16px", width: 64, height: 64 }}
      />
      <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "500" }}>
        Admin Dashboard
      </h2>
      <button
        onClick={() => {
          message.success("Logout Successfully!");
          navigate("/login");
          localStorage.removeItem("token");
          console.log("logout Successfully=>", localStorage.removeItem("token"));
          
        }}
        className="cursor-pointer bg-blue-600 text-white font-semibold rounded-md py-1.5 px-4 text-lg"
      >
        Logout
      </button>
    </Header>
  );
};

export default Headers;
