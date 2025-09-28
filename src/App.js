import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  return loggedIn ? (
    <Dashboard />
  ) : (
    <Login
      onLogin={(role) => {
        setLoggedIn(true);
      }}
    />
  );
}

export default App;
