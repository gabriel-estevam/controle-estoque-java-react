import React from 'react';
import { LayoutBasePagina } from '../layouts';
import { BarraFerramentas } from '../../components/BarraFerramentas';

export const Dashboard = () => {
    return (
        <LayoutBasePagina 
            titulo='Home' 
            barraFerramentas={(
                <BarraFerramentas
                    mostrarInputBusca
                    mostrarBotaoNovo
                    textoBotaoNovo='NOVO'
                />)}
        >
            Testando...
        </LayoutBasePagina>
    );
};