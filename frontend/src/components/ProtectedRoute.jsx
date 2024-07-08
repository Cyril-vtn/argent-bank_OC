import { Navigate, useLocation } from "react-router-dom";
// Importez useSelector de react-redux une fois que vous avez configuré Redux
// import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  // Remplacez cette partie par la logique de vérification d'authentification avec Redux
  const isAuthenticated = true; // useSelector(state => state.user.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
