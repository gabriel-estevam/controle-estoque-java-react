<<<<<<< HEAD
import React, { ReactNode, useEffect } from 'react';
=======
import React, { ReactNode } from 'react';
>>>>>>> 5e6e3789ae444ee72256c89ff2eecbcc8aa8e4f4
import { MenuLateral } from '../../components/MenuLateral';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';

<<<<<<< HEAD
export const Home: React.FC = () => {
=======
type Props = {
    children: ReactNode;
};

export const Home: React.FC <Props> = ({ children }) => {
>>>>>>> 5e6e3789ae444ee72256c89ff2eecbcc8aa8e4f4
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
            {/*<Button onClick={toggleDrawerOpen}>Toogle drawer</Button>
            <Button onClick={logout}>Logout</Button>*/}
            {children}
        </MenuLateral>
    </>
    )
};

//export default Home;