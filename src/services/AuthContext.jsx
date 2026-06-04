// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchRole } from '../redux/reduxthink/fetchRole';
import { useDispatch } from 'react-redux';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch()
    dispatch(fetchRole())
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         setIsAuthenticated(true);
    //     }
    // }, []);

    // const login = () => {
    //     // Perform login logic
    //     if (token) {
    //         setIsAuthenticated(true);
    //     } else {
    //         setIsAuthenticated(false);
    //     }
    // };

    // const logout = () => {
    //     // Perform logout logic
    //     setIsAuthenticated(false);
    // };


    return (
        <AuthContext.Provider value={{ isAuthenticated: localStorage.getItem('token') ? true : false }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
