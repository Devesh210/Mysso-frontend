// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    console.log(isAuthenticated, "========================================>")

    return isAuthenticated ? (
        React.cloneElement(Component, rest)
    ) : (
        <Navigate to="/Login" replace />
    );
};

export default ProtectedRoute;
