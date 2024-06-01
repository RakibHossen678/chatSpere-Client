import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <span className="loading loading-bars loading-lg bg-[#9ef01a]"></span>
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
