import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import { Home } from '../pages/Home';
import { Estoque } from '../pages/Estoque';

// @ts-ignore
const PrivateRoute = ({ children, redirectTo }) => {
    const isAuthenticated = localStorage.getItem("token") !== null;
    console.log("isAuth: ", isAuthenticated);
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  };

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/home" 
                  element={<PrivateRoute redirectTo="/">
                               <Home/>
                           </PrivateRoute>
                  } />

            <Route path="/estoque" 
                  element={<PrivateRoute redirectTo="/">
                               <Estoque/>
                           </PrivateRoute>
                  } />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}