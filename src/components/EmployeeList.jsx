import React from "react";
import EmployeeCard from "./EmployeeCard";
import "./EmployeeList.css";

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  if (!employees.length) return <p>No employees found.</p>;

  return (
    <div className="employee-list">
      {employees.map((emp) => (
        <EmployeeCard
          key={emp._id}
          employee={emp}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
