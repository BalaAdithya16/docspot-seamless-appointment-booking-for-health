import { Navigate } from "react-router-dom";

const PublicRoutes = (props) => {
  const user = localStorage.getItem("user");

  if (user) {
    return <Navigate to="/" replace />;
  } else {
    return props.children;
  }
};

export default PublicRoutes;
