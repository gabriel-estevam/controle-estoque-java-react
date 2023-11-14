import React from 'react';
import { Button } from '@mui/material';

interface Iprops {
    statusRequisicao: string | undefined;
}

export const ButtonStatus: React.FC<Iprops> = ({ statusRequisicao }) => {
    return(
        <>
            {
                statusRequisicao === "APROVADA" &&(
                <Button
                    variant="contained"
                    color="success"
                    disableElevation
                >{statusRequisicao}</Button>
                )
            }
            {
                statusRequisicao === "ABERTA" &&(
                    <Button
                        variant="contained"
                        color="warning"
                        disableElevation
                    >{statusRequisicao}</Button>
                )
            }
            {
                statusRequisicao === "REPROVADA" &&(
                    <Button
                        variant="contained"
                        color="error"
                        disableElevation
                    >{statusRequisicao}</Button>
                )
            }
        
        </>
    );
};