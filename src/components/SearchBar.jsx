import React from "react";
import "./SearchBar.css";

const SearchBar = ({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  role,
  onRoleChange,
  roles = ["user", "admin"],
  departments = ["HR", "Engineering", "Sales", "Marketing"],
}) => {
  const handleClear = () => {
    onSearchChange("");
    onDepartmentChange("");
    onRoleChange("");
  };

  // Sort departments and roles alphabetically
  const sortedDepartments = [...departments].sort((a, b) => a.localeCompare(b));
  const sortedRoles = [...roles].sort((a, b) => a.localeCompare(b));

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select value={department} onChange={(e) => onDepartmentChange(e.target.value)}>
        <option value="">All Departments</option>
        {sortedDepartments.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select value={role} onChange={(e) => onRoleChange(e.target.value)}>
        <option value="">All Roles</option>
        {sortedRoles.map((r) => (
          <option key={r} value={r}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </option>
        ))}
      </select>

      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default SearchBar;
