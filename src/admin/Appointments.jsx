 import { Calendar } from "antd";
import React from "react";
const Appointments = ({ appointments }) => {
  const dateCellRender = (value) => {
    const listData = appointments.filter((app) =>
        new Date(app.date).toDateString() === value.toDate().toDateString()
    );
    return (
      <ul>
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status="success" text={item.user.name} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};
export default Appointments;
 