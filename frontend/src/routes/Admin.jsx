import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const url = "http://localhost:3000";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const response = await axios.get(`${url}/api/private/admin-only`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Ensure the response data structure is as expected
        if (response.data.success && response.data.role) {
          setIsAuthenticated(true);
          setRole(response.data.role);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated || role === "Admin") {
    return <Navigate to="/admin-dashboard" />;
  }

  if (!isAuthenticated || role !== "Admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
