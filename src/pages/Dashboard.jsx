import React, { useEffect, useState, useCallback } from "react";
import { getEmployees, deleteEmployee, updateEmployee } from "../services/api";
import SearchBar from "../components/SearchBar";
import EmployeeList from "../components/EmployeeList";
import AdminPanel from "../components/AdminPanel";
import "./Dashboard.css";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);

  const [roles, setRoles] = useState(["user", "admin"]);
  const [departments, setDepartments] = useState(["HR", "Engineering", "Sales", "Marketing"]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchEmployees = useCallback(async () => {
    try {
      const res = await getEmployees(token);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id, token);
      fetchEmployees();
    }
  };

  const handleEdit = (employee) => setEditEmployee(employee);

  const handleUpdate = async (id, data) => {
    await updateEmployee(id, data, token);
    setEditEmployee(null);
    fetchEmployees();
  };

  // Sort employees alphabetically by name, then apply filters
  const filteredEmployees = [...employees]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase());
      const matchesDepartment = departmentFilter ? emp.department === departmentFilter : true;
      const matchesRole = roleFilter ? emp.role === roleFilter : true;
      return matchesSearch && matchesDepartment && matchesRole;
    });

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Employee Directory</h1>
        <p className="dashboard-subtitle">Manage and view your employees easily</p>
      </header>

      <SearchBar
        search={search}
        onSearchChange={setSearch}
        department={departmentFilter}
        onDepartmentChange={setDepartmentFilter}
        role={roleFilter}
        onRoleChange={setRoleFilter}
        roles={roles}
        departments={departments}
      />

      <EmployeeList
        employees={filteredEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {role === "admin" && (
        <AdminPanel
          refresh={fetchEmployees}
          editEmployee={editEmployee}
          onUpdate={handleUpdate}
          roles={roles}
          setRoles={setRoles}
          departments={departments}
          setDepartments={setDepartments}
        />
      )}
    </div>
  );
};

export default Dashboard;
