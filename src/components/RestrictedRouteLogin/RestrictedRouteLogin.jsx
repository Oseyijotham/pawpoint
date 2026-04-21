import { useAuthHook } from '../../customHook/customHook';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';



export const RestrictedRouteLogin = ({ component: Component, redirectTo}) => {
  const { isLoggedIn } = useAuthHook();
 

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

RestrictedRouteLogin.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string,
};