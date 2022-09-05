import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
//import { useUserContext } from '../context/user_context';
//import userEvent from '@testing-library/user-event';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;
  if (!isUser) {
    return <Navigate to='/' />;
  }

  return children;
};
export default PrivateRoute;
