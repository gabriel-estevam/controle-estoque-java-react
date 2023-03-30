import React from 'react';

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes';
import { DrawerProvider } from './contexts';
import { ThemeProvider } from '@mui/material';
import { CommonTheme } from './themes/common';

function App() {

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
