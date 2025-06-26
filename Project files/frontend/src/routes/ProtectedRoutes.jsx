import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const user = localStorage.getItem("user");

  if (user) {
    return props.children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;
