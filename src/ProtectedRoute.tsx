import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = localStorage.getItem("auth_token") === "true";

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
