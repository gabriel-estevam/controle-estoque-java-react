import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import{ Login } from '../pages/Login';
import { useDrawerContext } from '../contexts';

import { 
  Dashboard, 
  Filiais, 
  Fornecedores, 
  Home, 
  Produtos, 
  Usuarios,
  EstoqueEntrada, 
  MovimentacaoEstoque, 
  ConsultaEstoque, 
  Solicitacao, 
  Compras, 
  RelatorioProdutos,
  Recebimento
} from '../pages';

import { 
  FaHome, 
  FaUsers, 
  FaBuilding, 
  FaTags, 
  FaHandshake, 
  FaBoxes, 
  FaBoxOpen, 
  FaCartPlus, 
  FaCalendarCheck
} from 'react-icons/fa';

// @ts-ignore
const PrivateRoute = ({ children, redirectTo }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated ? <Home>{children}</Home>  : <Navigate to={redirectTo} />;
};

export const AppRoutes: React.FC = () => {
    
  const { setDrawerOptions, setDrawerOptionsNestedList, setDrawerOptionsNestedListReports } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        path: '/home',
        label: 'Home',
        icon: <FaHome color='#b7b9bb'/>,
      },
      {
        path: '/estoque/entrada',
        label: 'Estoque Materiais',
        icon: <FaBoxes color='#b7b9bb'/>,
      },
      {
        path: '/estoque/consultaMovimentacao',
        label: 'Consultar Movimentação de Estoque',
        icon: <FaBoxOpen color='#b7b9bb'/>,
      },
      
      {
        path: '/estoque/movimentacao',
        label: 'Movimentação de Estoque',
        icon: <FaBoxOpen color='#b7b9bb'/>,
      },
      {
        path: '/estoque/solicitacao',
        label: 'Requisição de Materiais',
        icon: <FaCartPlus color='#b7b9bb'/>,
      },

      {
        path: '/estoque/compras',
        label: 'Compras',
        icon: <FaCartPlus color='#b7b9bb'/>,
      },
      {
        path: '/estoque/recebimento',
        label: 'Recebimento',
        icon: <FaCalendarCheck color='#b7b9bb'/>,
      },
    ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  useEffect(() => {
    setDrawerOptionsNestedList([
      {
        path: '/usuario',
        label: 'Usuários',
        icon: <FaUsers color='#b7b9bb'/>,
      },
      {
        path: '/filial',
        label: 'Filiais',
        icon: <FaBuilding color='#b7b9bb'/>,
      },

      {
        path: '/produto',
        label: 'Produtos',
        icon: <FaTags color='#b7b9bb'/>,
      },
      {
        path: '/fornecedor',
        label: 'Fornecedores',
        icon: <FaHandshake color='#b7b9bb'/>,
      },
    ])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDrawerOptionsNestedListReports([
      {
        path: '/relatorio/produto',
        label: 'Relatórios de Produtos',
        icon: <FaTags color='#b7b9bb'/>,
      },
    ])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route 
        path="/home" 
        element={
          <PrivateRoute redirectTo="/">
            <Dashboard/>  
          </PrivateRoute>
        } 
      />
      <Route 
        path="/estoque/entrada" 
        element={
          <PrivateRoute redirectTo="/">
            <EstoqueEntrada/>  
          </PrivateRoute>
        } 
      />
      <Route 
        path="/estoque/solicitacao" 
        element={
          <PrivateRoute redirectTo="/">
            <Solicitacao/>  
          </PrivateRoute>
        } 
      />

      <Route 
        path="/estoque/compras" 
        element={
          <PrivateRoute redirectTo="/">
            <Compras/>  
          </PrivateRoute>
        } 
      />

      <Route 
        path="/estoque/recebimento" 
        element={
          <PrivateRoute redirectTo="/">
            <Recebimento/>  
          </PrivateRoute>
        } 
      />

      <Route 
        path="/estoque/movimentacao" 
        element={
          <PrivateRoute redirectTo="/">
            <MovimentacaoEstoque/>  
          </PrivateRoute>
        } 
      />

      <Route 
        path="/estoque/consultaMovimentacao" 
        element={
          <PrivateRoute redirectTo="/">
            <ConsultaEstoque/>  
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/usuario" 
        element={
          <PrivateRoute redirectTo="/">
            <Usuarios/>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/filial" 
        element={
          <PrivateRoute redirectTo="/">
            <Filiais/>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/produto" 
        element={
          <PrivateRoute redirectTo="/">
            <Produtos/>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/fornecedor" 
        element={
          <PrivateRoute redirectTo="/">
            <Fornecedores/>
          </PrivateRoute>
        } 
      />

      <Route 
        path="/relatorio/produto" 
        element={
          <PrivateRoute redirectTo="/">
            <RelatorioProdutos/>
          </PrivateRoute>
        } 
      />
    
    </Routes>
  );
}