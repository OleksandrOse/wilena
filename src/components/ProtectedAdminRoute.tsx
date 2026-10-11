import { Navigate } from "react-router-dom";

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("adminAccessToken");
  const userRaw = localStorage.getItem("adminUser");

  let isAdmin = false;
  try {
    const user = userRaw ? JSON.parse(userRaw) : null;
    isAdmin = user?.role === "admin";
  } catch {
    isAdmin = false;
  }

  if (!token || !isAdmin) {
    return <Navigate to="/wilena" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
