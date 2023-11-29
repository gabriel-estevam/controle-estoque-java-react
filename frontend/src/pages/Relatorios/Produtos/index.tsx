import React from 'react';

import { BarraFerramentas } from '../../../components';

import { LayoutBasePagina } from '../../layouts';

import { Relatorios } from '../../../services/api/relatorios/Relatorios';
import { DecodeTokenJWT } from '../../../services/api/auth/decode/DecodeTokenJWT';

import "../../../styles/index.css";

export const RelatorioProdutos: React.FC = () => {

    const gerarRelatorio = () => {

        //@ts-ignore
        const idFilial = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario.filialFK;

        Relatorios.exportPDF("Produtos", idFilial);
    }

    return (
        <LayoutBasePagina
            renderTabela={false}
            titulo="Relatório de Produtos"
            relatorios={true}
            barraFerramentas={
                <BarraFerramentas
                    textoBotaoNovo="Gerar Relatório"
                    mostrarInputBusca={false}
                    mostrarBotaoNovo
                    aoClicarEmNovo={() => { gerarRelatorio(); }}
                />
            }
        > 
        </LayoutBasePagina>
    );
};