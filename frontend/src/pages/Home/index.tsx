import React, { ReactNode } from 'react';
import { MenuLateral } from '../../components/MenuLateral';

type Props = {
    children: ReactNode;
};

export const Home: React.FC <Props> = ({ children }) => {
    return (
    <>
        <MenuLateral>
            {children}
        </MenuLateral>
    </>
    )
};

//export default Home;