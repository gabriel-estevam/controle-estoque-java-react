import React from 'react';
//import Login from './pages/Login';
//import Home from './pages/Home';

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes';

function App() {
  /*
  <Login/>
  <Home/>
  */
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;
