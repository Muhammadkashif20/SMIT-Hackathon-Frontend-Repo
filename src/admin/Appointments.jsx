import { Layout, Card, Space } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import Sidebar from "./Sidebar";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${BASE_URL}/appointments/getSlip`);
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  
  return (
    <Layout style={{ minHeight: "100vh", background: "#eef2f6" }}>
      <Sidebar>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: "20px"
        }}>
          <h2 style={{
            marginBottom: "22px",
            color: "#386BC0",
            fontWeight: "bold",
            fontSize: "20px",
            alignSelf: "flex-start"
          }}>
            Appointments Schedule 📅
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
            width: "100%",
            maxWidth: "1200px",
            justifyContent: "center"
          }}>
            {appointments.map((appointment) => (
              <Card
                key={appointment._id}
                title={
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {appointment.token}
                  </span>
                }
                style={{
                  width: "100%",
                  maxWidth: "400px",
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
                  <strong style={{ color: "#555" }}>Date:</strong> {appointment.date}
                </p>
                <p style={{ marginBottom: 8 }}>
                  <strong style={{ color: "#555" }}>Time:</strong> {appointment.time}
                </p>
                <p style={{ marginBottom: 8 }}>
                  <strong style={{ color: "#555" }}>Location:</strong> {appointment.officeLocation}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Sidebar>
    </Layout>
  );
};

export default Appointments;