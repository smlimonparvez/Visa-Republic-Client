import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';

const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
      return <Loading></Loading>;
    }
    if (user && user?.email) {
      return children;
    }
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;