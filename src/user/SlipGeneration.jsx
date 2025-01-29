import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "antd";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const appointmentDetails = {
  date: "2025-02-01",
  time: "10:00 AM",
  officeLocation: "Office #123, Main Street",
};

const generateToken = () => Math.floor(100000 + Math.random() * 900000);

const SlipGeneration = () => {
  const [token] = useState(generateToken());
  const [showSlip, setShowSlip] = useState(false);

  const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: "Helvetica" },
    section: { marginBottom: 10 },
  });

  const MyDocument = (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Token Number: {token}</Text>
          <Text>Appointment Date: {appointmentDetails.date}</Text>
          <Text>Appointment Time: {appointmentDetails.time}</Text>
          <Text>Office Location: {appointmentDetails.officeLocation}</Text>
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
            <strong>Token Number:</strong> {token}
          </p>
          <div className="flex justify-center my-4">
            <QRCode value={`Token: ${token}\nDate: ${appointmentDetails.date}\nTime: ${appointmentDetails.time}\nLocation: ${appointmentDetails.officeLocation}`} />
          </div>
          <p className="text-gray-700"><strong>Appointment Details:</strong></p>
          <p>Date: {appointmentDetails.date}</p>
          <p>Time: {appointmentDetails.time}</p>
          <p>Location: {appointmentDetails.officeLocation}</p>

          <PDFDownloadLink
            document={MyDocument}
            fileName="appointment-slip.pdf"
            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
          </PDFDownloadLink>
        </div>
      ) : (
        <Button 
          onClick={() => setShowSlip(true)} 
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Generate Slip
        </Button>
      )}
    </div>
  );
};

export default SlipGeneration;
