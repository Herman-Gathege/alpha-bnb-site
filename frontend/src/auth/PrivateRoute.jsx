//frontend/src/auth/PrivateRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const PrivateRoute = ({ children, role }) => {
  const tokenValid = isAuthenticated();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚫 Not logged in
  if (!tokenValid) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Role check (only if role is required)
  if (role && user?.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;