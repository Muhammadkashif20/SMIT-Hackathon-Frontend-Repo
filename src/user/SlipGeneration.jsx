import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import QRCode from "react-qr-code";
import { Button } from "antd";
import axios from "axios";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import { BASE_URL } from "../utils/baseurl";

// Random data generators
const getRandomDate = () => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30));
  return futureDate.toISOString().split("T")[0];
};

const getRandomTime = () => {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.random() < 0.5 ? "00" : "30";
  const ampm = Math.random() < 0.5 ? "AM" : "PM";
  return `${hours}:${minutes} ${ampm}`;
};

const getRandomLocation = () => {
  const locations = [
    "Main Bahadurabad Chaar Minaar Chowrangi",
    "Main Gulshan Chowrangi Mumtaz Mobile Mall",
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

const generateToken = () => Math.floor(100000 + Math.random() * 900000);

const SlipGeneration = () => {
  const navigate = useNavigate(); // Navigation hook

  const [formData, setFormData] = useState({
    token: "",
    date: "",
    time: "",
    officeLocation: "",
  });

  const [showSlip, setShowSlip] = useState(false);

  const generateNewAppointment = async () => {
    const newFormData = {
      token: generateToken(),
      date: getRandomDate(),
      time: getRandomTime(),
      officeLocation: getRandomLocation(),
    };

    setFormData(newFormData);
    setShowSlip(true);

    try {
      const response = await axios.post(`${BASE_URL}/appointments/addSlip`, newFormData);
      console.log("Slip Saved Successfully:", response.data);
    } catch (error) {
      console.error("Error sending appointment to backend:", error);
    }
  };

  const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: "Helvetica" },
    section: { marginBottom: 10 },
  });

  const MyDocument = (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Token Number: {formData.token}</Text>
          <Text>Appointment Date: {formData.date}</Text>
          <Text>Appointment Time: {formData.time}</Text>
          <Text>Office Location: {formData.officeLocation}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Appointment Slip</h1>

      {showSlip ? (
        <div className="bg-white shadow-lg rounded-lg p-6 text-center w-96">
          <h2 className="text-xl font-semibold mb-2">Appointment Slip</h2>
          <p className="text-gray-700">
            <strong>Token Number:</strong> {formData.token}
          </p>
          <div className="flex justify-center my-4">
            <QRCode
              value={`Token: ${formData.token}\nDate: ${formData.date}\nTime: ${formData.time}\nLocation: ${formData.officeLocation}`}
            />
          </div>
          <p className="text-gray-700">
            <strong>Appointment Details:</strong>
          </p>
          <p>Date: {formData.date}</p>
          <p>Time: {formData.time}</p>
          <p>Location: {formData.officeLocation}</p>

          <div className="flex flex-col items-center mt-4">
            <PDFDownloadLink
              document={MyDocument}
              fileName="appointment-slip.pdf"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              {({ loading }) =>
                loading ? "Loading document..." : "Download PDF"
              }
            </PDFDownloadLink>

            {/* Go Home Button */}
            <Button
              onClick={() => navigate("/user-dashboard")}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Go Home
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={generateNewAppointment}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Generate Slip
        </Button>
      )}
    </div>
  );
};

export default SlipGeneration;
