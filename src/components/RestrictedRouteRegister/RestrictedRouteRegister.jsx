import { useAuthHook } from '../../customHook/customHook';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';



export const RestrictedRouteRegister = ({ component: Component, redirectTo = '/' }) => {
  const { isRegistered } = useAuthHook();
  

  return isRegistered ? <Navigate to={redirectTo} /> : Component;
};

RestrictedRouteRegister.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string,
};