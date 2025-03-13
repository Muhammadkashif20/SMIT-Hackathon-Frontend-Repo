import React from "react";
import {
  AppstoreAddOutlined,
  DollarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
 const menuItems = [
  {
    key: "dashboard",
    icon: <AppstoreAddOutlined />,
    label: <Link to={"/user-dashboard"}>User Dashboard</Link>,
  },
  {
    key: "adminDashboard",
    icon: <AppstoreAddOutlined />,
    label: <Link to={"/admin-dashboard"}>Dashboard</Link>,
  },
  {
    key: "loans",
    icon: <DollarOutlined />,
    label: <Link to={"/admin-loandetail"}>Loan Details</Link>,
  },
  {
    key: "appointments",
    icon: <CalendarOutlined />,
    label: <Link to={"/admin-appointments"}>Appointments</Link>,
  },
];
export default menuItems;
