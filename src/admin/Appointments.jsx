import { Layout, Menu, Button, Space, Card } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined,
  DollarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import saylanilogo from "../assets/image/saylani welfare.png";
import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import menuItems from "./data";
const { Header, Sider, Content } = Layout;

const Appointments = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect( () => {
    const fetchData = async () => {
    try {
      let response = await axios.get(`${BASE_URL}/appointments/getSlip`);
      console.log("response=>", response);
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchData()
  }, []);



  return (
    <Layout style={{ minHeight: "100vh", background: "#eef2f6" }}>
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
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "500" }}>
            Admin Dashboard
          </h2>
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
          <h2
            style={{
              marginBottom: "22px",
              color: "#155DFC",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Appointments Schedule
          </h2>
          <Space
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
            }}
          >
            {appointments.map((appointment) => (
              <Card
                key={appointment._id}
                title={
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {appointment.token}
                  </span>
                }
                style={{
                  width: 320,
                  textAlign: "left",
                  background: "#f9f9f9",
                  borderRadius: "10px",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                hoverable
              >
                <p style={{ marginBottom: 8 }}>
                  <strong style={{ color: "#555" }}>Date:</strong>{" "}
                  {appointment.date}
                </p>
                <p style={{ marginBottom: 8 }}>
                  <strong style={{ color: "#555" }}>Time:</strong>{" "}
                  {appointment.time}
                </p>
                <p style={{ marginBottom: 8 }}>
                  <strong style={{ color: "#555" }}>Location:</strong>{" "}
                  {appointment.officeLocation}
                </p>
              </Card>
            ))}
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Appointments;
