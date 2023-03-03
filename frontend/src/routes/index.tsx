import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import { Home } from '../pages/Home';
import { Dashboard } from '../pages/Dashboard';
import { useDrawerContext } from '../contexts/DrawerContext';
import { Usuarios } from '../pages/Usuarios';
import { FaHome, FaUsers } from 'react-icons/fa';
// @ts-ignore
const PrivateRoute = ({ children, redirectTo }) => {
    const isAuthenticated = localStorage.getItem("token") !== null;
    console.log("isAuth: ", isAuthenticated);
    return isAuthenticated ? <Home>{children}</Home>  : <Navigate to={redirectTo} />;
  };

export const AppRoutes = () => {
    
    const { setDrawerOptions, setDrawerOptionsNestedList } = useDrawerContext();
    useEffect(() => {
      setDrawerOptions([
        {
          path: '/home',
          label: 'Home',
          icon: <FaHome color='#b7b9bb'/>,
        },
       /* {
          path: '/usuario',
          label: 'Cadastros',
          icon: <FaListAlt color='#b7b9bb'/>
        },*/
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
      setDrawerOptionsNestedList([
        {
          path: '/usuario',
          label: 'Usuários',
          icon: <FaUsers color='#b7b9bb'/>
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Routes>
            <Route path="/home" 
                  element={<PrivateRoute redirectTo="/">
                              <Dashboard/>  
                           </PrivateRoute>
                  } 
            />
            <Route path="/usuario" 
                  element={<PrivateRoute redirectTo="/">
                              <Usuarios/>
                           </PrivateRoute>
                  } 
            />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}