import { Layout, Menu, Button, Space, Card } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
const { Content } = Layout;
import Sidebar from "./Sidebar";
import Headers from "./Header";
const Appointments = () => {
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
            <Sidebar/>
      <Layout>
      <Headers/>
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
