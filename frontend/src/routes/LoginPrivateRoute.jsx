import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const LoginPrivateRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  if (!userData) {
    return children;
  }

  if (userData && userData.role === "Admin") {
    return <Navigate to="/admin-dashboard" />;
  }

  if (userData && userData.role === "Front Desk") {
    return <Navigate to="/frontdesk-dashboard" />;
  }

  if (userData && userData.role === "Assessor") {
    return <Navigate to="/assessor-dashboard" />;
  }

  if (userData && userData.role === "Care Manager") {
    return <Navigate to="/care-manager-dashboard" />;
  }

  if (userData && userData.role === "Home Care Staff") {
    return <Navigate to="/homecare-dashboard" />;
  }

  return children;
};

export default LoginPrivateRoute;
