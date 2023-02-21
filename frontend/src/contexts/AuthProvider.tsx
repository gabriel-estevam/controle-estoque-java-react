import React, { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';

type Props = {
    children: ReactNode,
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState(false);
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}