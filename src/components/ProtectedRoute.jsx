import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return token ? true : false;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    console.log(
      "Utilisateur non authentifié, redirection vers la page de connexion."
    );
    return <Navigate to="/connexion" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
