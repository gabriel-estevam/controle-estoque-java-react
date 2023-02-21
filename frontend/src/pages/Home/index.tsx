import React from 'react';
import { MenuLateral } from '../../components/MenuLateral';
import { Button } from '@mui/material';

function Home() {
    console.log("token veio" + localStorage.getItem("token"))
    return (
    <>
        <MenuLateral>
            <Button>Toogle</Button>
        </MenuLateral>
    </>
    )
}

export default Home;