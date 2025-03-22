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
      {
        key: "weddingloans",
        icon: <UserOutlined />,
        label: <Link to={"/weddingloans"}>Wedding Loan</Link>,
      },
      {
        key: "constructionloans",
        icon: <BankOutlined />,
        label: <Link to={"/constructionloans"}>Home Construction Loans</Link>,
      },
      {
        key: "businessloans",
        icon: <DollarOutlined />,
        label: <Link to={"/businessloans"}>Business Startup Loans</Link>,
      },
      {
        key: "educationloans",
        icon: <BookOutlined />,
        label: <Link to={"/educationloans"}>Education Loans</Link>,
      },
    ],
  },
];
export default menuItems;
