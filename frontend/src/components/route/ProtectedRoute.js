import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useSelector(state => state.auth);

    if (loading) return <div>Loading...</div>; // Prevent redirect while loading

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
