import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo && userInfo.token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRedirect;