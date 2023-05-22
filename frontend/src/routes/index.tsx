import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import{ Login } from '../pages/Login';
import { useDrawerContext } from '../contexts';
import { Dashboard, Filiais, Fornecedores, Home, Produtos, Usuarios } from '../pages';
import { FaHome, FaUsers, FaBuilding, FaTags, FaHandshake } from 'react-icons/fa';
// @ts-ignore
const PrivateRoute = ({ children, redirectTo }) => {
    const isAuthenticated = localStorage.getItem("token") !== null;
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
        {
          path: '/filial',
          label: 'Filiais',
          icon: <FaBuilding color='#b7b9bb'/>
        },

        {
          path: '/produto',
          label: 'Produtos',
          icon: <FaTags color='#b7b9bb'/>
        },
        {
          path: '/fornecedor',
          label: 'Fornecedores',
          icon: <FaHandshake color='#b7b9bb'/>
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
            <Route path="/filial" 
                  element={<PrivateRoute redirectTo="/">
                              <Filiais/>
                           </PrivateRoute>
                  } 
            />
            <Route path="/produto" 
                  element={<PrivateRoute redirectTo="/">
                              <Produtos/>
                           </PrivateRoute>
                  } 
            />
            <Route path="/fornecedor" 
                  element={<PrivateRoute redirectTo="/">
                              <Fornecedores/>
                           </PrivateRoute>
                  } 
            />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}