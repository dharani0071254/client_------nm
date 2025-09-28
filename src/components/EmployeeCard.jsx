import React, { useState } from "react";
import "./EmployeeCard.css";

const getRandomColor = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 80%)`;
};

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const bgColor = getRandomColor(employee.name);

  return (
    <div
      className={`employee-card ${showDetails ? "active" : ""}`}
      onClick={() => setShowDetails(!showDetails)}
      style={{ "--bg-color": bgColor }}
    >
      {employee.image ? (
        <img src={employee.image} alt={employee.name} className="employee-image" />
      ) : (
        <div className="employee-initials">{initials}</div>
      )}

      <div className="employee-basic">
        <h3 className="employee-name">{employee.name}</h3>
        <p className="employee-role">{employee.role}</p>
        <p className="employee-department">{employee.department}</p>
      </div>

      {showDetails && (
        <div className="employee-details">
          <p>Email: {employee.email}</p>
          <p>Phone: {employee.phone || "N/A"}</p>
          <div className="employee-buttons">
            <button className="edit-btn" onClick={(e) => { e.stopPropagation(); onEdit(employee); }}>Edit</button>
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(employee._id); }}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;
