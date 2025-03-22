import React from 'react'
import saylanilogo from "../assets/image/saylani welfare.png";
import menuItems from "./data";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
const Sidebar = ({collapsed}) => {
  console.log("collapsed=>",collapsed);
  
  return (  
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
        <Menu theme="light" mode="inline" items={menuItems} />
      </Sider>

  )
}

export default Sidebar
