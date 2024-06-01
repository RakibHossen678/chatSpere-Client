import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="w-16 h-16 border-4 rounded-full animate-spin border-[#9ef01a]"></div>
    );
  if (user) return children;
  return (
    <Navigate to="/login" state={location?.pathname} replace={true}></Navigate>
  );
};
PrivateRoute.propTypes = {
  children: PropTypes.element,
};
export default PrivateRoute;
