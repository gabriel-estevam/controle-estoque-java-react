import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import { Home } from '../pages/Home';
<<<<<<< HEAD
import { Estoque } from '../pages/Estoque';
=======
import { Dashboard } from '../pages/Dashboard/Dashboard';
>>>>>>> 5e6e3789ae444ee72256c89ff2eecbcc8aa8e4f4

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
<<<<<<< HEAD
                               <Home/>
                           </PrivateRoute>
                  } />

            <Route path="/estoque" 
                  element={<PrivateRoute redirectTo="/">
                               <Estoque/>
=======
                                <Home>
                                    <Dashboard/>
                                </Home>
>>>>>>> 5e6e3789ae444ee72256c89ff2eecbcc8aa8e4f4
                           </PrivateRoute>
                  } />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}