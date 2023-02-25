import React, { ReactNode } from 'react';
import { MenuLateral } from '../../components/MenuLateral';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';

type Props = {
    children: ReactNode;
};

export const Home: React.FC <Props> = ({ children }) => {
    console.log("token veio" + localStorage.getItem("token"))
    const navigate = useNavigate();
    const logout = () => { localStorage.removeItem("token"); navigate("/"); };
    const { toggleDrawerOpen } = useDrawerContext();
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