import React from 'react';
//import Login from './pages/Login';
//import Home from './pages/Home';

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes';
import { DrawerProvider } from './contexts';

function App() {
  /*
  <Login/>
  <Home/>
  */
  return (
    <DrawerProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </DrawerProvider>
  );
}

export default App;
