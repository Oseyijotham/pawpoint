import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectIsRegistered,
  selectToken,
  selectAll,
} from '../redux/AuthRedux/selectors';

export const useAuthHook = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const isRegistered = useSelector(selectIsRegistered);
  const token = useSelector(selectToken);
  const All = useSelector(selectAll);
  

  return {
    isLoggedIn,
    isRefreshing,
    user,
    isRegistered,
    token,
    All
  };
};
