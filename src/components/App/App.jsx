import { useEffect, lazy, useRef } from 'react';
//import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { SharedSortingLayout } from '../SharedSortingLayout/SharedSortingLayout';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { RestrictedRouteRegister } from '../RestrictedRouteRegister/RestrictedRouteRegister';
import { RestrictedRouteLogin } from '../RestrictedRouteLogin/RestrictedRouteLogin';
import { RestrictedRouteNav } from '../RestrictedRouteNav/RestrictedRouteNav';
import { refreshUser, logOut } from '../../redux/AuthRedux/operations';
import { retrieveApiKey } from '../../redux/AppRedux/operations';
import { useDispatch } from 'react-redux';
import { useAuthHook } from '../../customHook/customHook'
import { jwtDecode } from 'jwt-decode';
import Notiflix from 'notiflix';
import { ThreeCircles } from 'react-loader-spinner';
import css from '../SortedAllTasks/SortedAllTasks.module.css';


const Register = lazy(() => import('../Register/Register'));
const Login = lazy(() => import('../Login/Login'));
const Contacts = lazy(() => import('../Contacts/Contacts'));
const Home = lazy(() => import('../Home/Home'));
const SharedFooter = lazy(() => import('../SharedFooter/SharedFooter'));
const SortedAllTasks = lazy(() => import('../SortedAllTasks/SortedAllTasks'));
const SortedPendingTasks = lazy(() => import('../SortedPendingTasks/SortedPendingTasks'));
const SortedCompletedTasks = lazy(() => import('../SortedCompletedTasks/SortedCompletedTasks'));
const SortedPastDueTasks = lazy(() => import('../SortedPastDueTasks/SortedPastDueTasks'));
const Profile = lazy(() => import('../Profile/Profile'));

export const App = () => {
  const { token, isRefreshing} = useAuthHook();
  const dispatch = useDispatch();
  const hasInitialized = useRef(false);

  // Effect to check and decode token
  /*By the way the token is null in the initial state so when the user logs in the value of the token changes which triggers the
  useEffect hook below*/
  useEffect(() => {
    if (!token) return;

    const checkTokenExpiry = () => {
      try {
        const { exp } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = exp - currentTime;

        // Add buffers for safety
        const LOGOUT_BUFFER = 60; // Logout 1 minute before
        const CLOCK_SKEW_BUFFER = 300; // 5 minutes clock difference buffer

        if (timeUntilExpiry <= LOGOUT_BUFFER + CLOCK_SKEW_BUFFER) {
          Notiflix.Notify.warning('Session expired');
          dispatch(logOut());
          return true; // Signal that cleanup happened
        }

        return false;
      } catch (error) {
        console.error('Token check failed:', error);
        dispatch(logOut());
        return true;
      }
    };

    // Check immediately on mount
    const shouldCleanup = checkTokenExpiry();
    if (shouldCleanup) return;

    // Then check every minute
    const interval = setInterval(checkTokenExpiry, 60 * 1000);

    return () => clearInterval(interval);
  }, [token, dispatch]);

  

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    dispatch(refreshUser());
    dispatch(retrieveApiKey());

  }, []);
  return isRefreshing ? (
    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
      <ThreeCircles
        visible={true}
        height="80"
        width="80"
        color="#9225ff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass={css.loader}
      />
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<SharedFooter />}>
        <Route
          index
          element={
            <RestrictedRouteLogin
              redirectTo="sharedLayout/Home"
              component={<Login />}
            />
          }
        />
        <Route
          path="register"
          element={
            <RestrictedRouteRegister redirectTo="/" component={<Register />} />
          }
        />
        <Route path="sharedLayout" element={<SharedLayout />}>
          <Route
            path="Home"
            element={<PrivateRoute redirectTo="/" component={<Home />} />}
          />
          <Route
            path="*"
            element={<PrivateRoute redirectTo="/" component={<Home />} />}
          />
          <Route
            path="placesFinder"
            element={<PrivateRoute redirectTo="/" component={<Contacts />} />}
          />
          <Route path="apiCreator" element={<SharedSortingLayout />}>
            <Route
              index
              element={
                <RestrictedRouteNav component={<SharedSortingLayout />} />
              }
            />

            <Route
              path="catImages"
              element={
                <PrivateRoute redirectTo="/" component={<SortedAllTasks />} />
              }
            />

            <Route
              path="dogImages"
              element={
                <PrivateRoute
                  redirectTo="/"
                  component={<SortedPendingTasks />}
                />
              }
            />

            <Route
              path="savedPlaces"
              element={
                <PrivateRoute
                  redirectTo="/"
                  component={<SortedCompletedTasks />}
                />
              }
            />

            <Route
              path="apiDocumentation"
              element={
                <PrivateRoute
                  redirectTo="/"
                  component={<SortedPastDueTasks />}
                />
              }
            />
          </Route>
          <Route
            path="profile"
            element={<PrivateRoute redirectTo="/" component={<Profile />} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};