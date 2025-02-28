 import React from "react";

 const loanDetail = () => {
    
    const columns = [
      { title: "Loan ID", dataIndex: "id", key: "id" },
      { title: "Category", dataIndex: "category", key: "category" },
      { title: "Subcategory", dataIndex: "subcategory", key: "subcategory" },
      { title: "Amount", dataIndex: "amount", key: "amount" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag color={status === "Pending" ? "orange" : "green"}>{status}</Tag>
        ),
      },
    ];
  
    const expandedRowRender = (record) => (
      <div>
        <p>
          <strong>Guarantor:</strong> {record.guarantor.name}
        </p>
        <p>
          <strong>User Info:</strong> {record.user.name}, {record.user.phone}
        </p>
      </div>
    );
  
    return (
      <Table
        dataSource={loans}
        columns={columns}
        expandable={{ expandedRowRender }}
        rowKey="id"
      />
    );
  };
  export default loanDetail;