import { Navigate, Route } from 'react-router-dom';
import { useProfile } from '../context/profile.context';

const PrivateRoute = ({ children, ...rest }) => {

    let profile = true;

  if (profile) {
    // User is authenticated, allow access to the route
    return <Route {...rest}>{children}</Route>;
  } else {
    // User is not authenticated, redirect to the sign-in page
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
