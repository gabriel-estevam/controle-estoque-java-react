import React from 'react';
import { MenuLateral } from '../../components';
export const Home = ({ children }) => {
    return (<>
        <MenuLateral>
            {children}
        </MenuLateral>
    </>);
};
//export default Home;
