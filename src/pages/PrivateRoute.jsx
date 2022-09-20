import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const currentUser = useAuth();

    return typeof currentUser === 'undefined' ? (
        <h1>Loading.....</h1>
      ) : currentUser ? (
        <Outlet />
      ) : (
        <Navigate to='/login' />
      );

}

export default PrivateRoute;
