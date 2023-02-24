import React, { ReactNode, useEffect } from 'react';
import { MenuLateral } from '../../components/MenuLateral';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';

export const Home: React.FC = () => {
    console.log("token veio" + localStorage.getItem("token"))
    const navigate = useNavigate();
    const logout = () => { localStorage.removeItem("token"); navigate("/"); };
    ///const { toggleDrawerOpen } = useDrawerContext();
    const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        path: '/estoque',
        label: 'Estoque',
      },
    ]);
  }, []);

    return (
    <>
        <MenuLateral>
            <Button onClick={toggleDrawerOpen}>Toogle drawer</Button>
            <Button onClick={logout}>Logout</Button>
        </MenuLateral>
    </>
    )
}

//export default Home;