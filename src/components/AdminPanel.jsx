import React, { useState, useEffect } from "react";
import { createEmployee } from "../services/api";
import "./AdminPanel.css";

const AdminPanel = ({ refresh, editEmployee, onUpdate, roles, setRoles, departments, setDepartments }) => {
  const token = localStorage.getItem("token");
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: departments[0] || "",
    role: roles[0] || "user",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDepartment, setNewDepartment] = useState("");

  useEffect(() => {
    if (editEmployee) {
      setEmployee({ ...editEmployee, password: "" });
    } else {
      setEmployee({
        name: "",
        email: "",
        department: departments[0] || "",
        role: roles[0] || "user",
        phone: "",
        password: "",
      });
    }
  }, [editEmployee, roles, departments]);

  const handleChange = (e) =>
    setEmployee({ ...employee, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    try {
      await createEmployee(employee, token);
      setEmployee({
        name: "",
        email: "",
        department: departments[0] || "",
        role: roles[0] || "user",
        phone: "",
        password: "",
      });
      refresh();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating employee");
    }
  };

  const handleUpdate = async () => {
    await onUpdate(employee._id, employee);
  };

  // Add a new role dynamically
  const handleAddRole = () => {
    const roleTrimmed = newRole.trim();
    if (roleTrimmed && !roles.includes(roleTrimmed)) {
      setRoles([...roles, roleTrimmed]);
      setNewRole("");
    }
  };

  // Delete a role
  const handleDeleteRole = (roleToDelete) => {
    if (window.confirm(`Are you sure you want to delete role "${roleToDelete}"?`)) {
      setRoles(roles.filter((r) => r !== roleToDelete));
      if (employee.role === roleToDelete) setEmployee({ ...employee, role: roles[0] });
    }
  };

  // Add a new department dynamically
  const handleAddDepartment = () => {
    const deptTrimmed = newDepartment.trim();
    if (deptTrimmed && !departments.includes(deptTrimmed)) {
      setDepartments([...departments, deptTrimmed]);
      setNewDepartment("");
    }
  };

  // Delete a department
  const handleDeleteDepartment = (deptToDelete) => {
    if (window.confirm(`Are you sure you want to delete department "${deptToDelete}"?`)) {
      setDepartments(departments.filter((d) => d !== deptToDelete));
      if (employee.department === deptToDelete) setEmployee({ ...employee, department: departments[0] });
    }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-title">{editEmployee ? "Edit Employee" : "Admin Panel (HR)"}</h2>

      <input
        className="admin-input"
        name="name"
        placeholder="Name"
        value={employee.name}
        onChange={handleChange}
      />
      <input
        className="admin-input"
        name="email"
        placeholder="Email"
        value={employee.email}
        onChange={handleChange}
      />

      {/* Department Dropdown */}
      <select
        className="admin-select"
        name="department"
        value={employee.department}
        onChange={handleChange}
      >
        {departments.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <input
        className="admin-input"
        name="phone"
        placeholder="Phone"
        value={employee.phone}
        onChange={handleChange}
      />
      <input
        className="admin-input"
        type="password"
        name="password"
        placeholder="Password"
        value={employee.password}
        onChange={handleChange}
      />

      <select
        className="admin-select"
        name="role"
        value={employee.role}
        onChange={handleChange}
      >
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {editEmployee ? (
        <button className="admin-button update" onClick={handleUpdate}>
          Update Employee
        </button>
      ) : (
        <button className="admin-button create" onClick={handleCreate}>
          Create Employee
        </button>
      )}

      {/* Dynamic Role Management */}
      <div className="role-management">
        <h4>Manage Roles</h4>
        <input
          type="text"
          placeholder="New Role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button onClick={handleAddRole}>Add Role</button>
        <ul>
          {roles.map((r) => (
            <li key={r}>
              {r}{" "}
              {r !== "user" && r !== "admin" && (
                <button onClick={() => handleDeleteRole(r)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Dynamic Department Management */}
      <div className="department-management">
        <h4>Manage Departments</h4>
        <input
          type="text"
          placeholder="New Department"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
        />
        <button onClick={handleAddDepartment}>Add Department</button>
        <ul>
          {departments.map((d) => (
            <li key={d}>
              {d}{" "}
              {!["HR", "Engineering", "Sales", "Marketing"].includes(d) && (
                <button onClick={() => handleDeleteDepartment(d)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AdminPanel;
