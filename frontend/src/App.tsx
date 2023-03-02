import React from 'react';
//import Login from './pages/Login';
//import Home from './pages/Home';

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes';
import { DrawerProvider } from './contexts';
import { ThemeProvider } from '@mui/material';
import { CommonTheme } from './themes/common';

function App() {
  /*
  <Login/>
  <Home/>
  */
  return (
    <ThemeProvider theme={ CommonTheme }>

    <DrawerProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </DrawerProvider>
    </ThemeProvider>
  );
}

export default App;
