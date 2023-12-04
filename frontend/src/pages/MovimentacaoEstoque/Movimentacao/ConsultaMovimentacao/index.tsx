import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    LinearProgress, 
    Pagination, 
    Table, 
    TableBody, 
    TableCell, 
    TableFooter, 
    TableHead, 
    TableRow}
from '@mui/material';
import TableContainer from '@mui/material/TableContainer';


import { BarraFerramentas } from '../../../../components';

import { LayoutBasePagina } from '../../../layouts';
import { Environment } from '../../../../environment/index';

import { useDebounce } from '../../../../hooks';

import '../../../../forms/TraducoesYup';


import { DecodeTokenJWT } from '../../../../services/api/auth/decode/DecodeTokenJWT';
import { EstoqueSaidaService, IListagemEstoqueSaida } from '../../../../services/api/estoque/EstoqueSaida';

export const ConsultaEstoque: React.FC = () => {

    //@ts-ignore
    const filialToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario.filialFK;

    const [searchParams, setSearchParams] = useSearchParams();
    
    const { debounce } = useDebounce(3000, true);
    
    const [rows, setRows] = useState<IListagemEstoqueSaida[]>([]);
    const [isLoading, setIsLoading] = useState(true); //verificar se foi carregado os dados no backend
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    },[searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    },[searchParams]);
    
    const paginaAPI = useMemo(() => {
        return Number(searchParams.get('paginaAPI') || '0');
    },[searchParams]);

    useEffect(() => {
        debounce(()=> {
            setIsLoading(true);

            EstoqueSaidaService.getAllContaing(paginaAPI, busca, filialToken)
            .then((result) => {
                setIsLoading(false);
    
                if(result instanceof Error) {
                    alert(result.message);
                }
                else {
                    setTotalElements(result.totalElements);
                    setTotalPages(result.totalPages);
                    setRows(result.content);
                }
            });
        });
    }, [busca, pagina, paginaAPI]);

    return (
        <LayoutBasePagina
            renderTabela
            titulo="Consultar Movimentação de Estoque"
            subTitulo="Materiais Saida Estoque"
            totalElements={(totalElements >=0 && totalElements < 3 ? 32 : 62) || (totalElements > 5 ? 65 : 65)}
            barraFerramentas={
                <BarraFerramentas
                    mostrarInputBusca
                    mostrarBotaoNovo={false}
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1', paginaAPI: '0' }, { replace: true })}
                />
            }
        >
            <TableContainer sx={{ height: "500px", margin: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Data de Movimentação</TableCell>
                            <TableCell>Produto</TableCell>
                            <TableCell>Unidade de Medida</TableCell>
                            <TableCell>Fornecedor</TableCell>
                            <TableCell>Quantidade Movimentada</TableCell>
                            <TableCell>Usuário</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                 <TableCell>{new Date(row.data).toLocaleString().replace(/,/,'')}</TableCell>
                                <TableCell>{row.estoque.itemEstoque.map(item => item.produto.nome)}</TableCell>
                                <TableCell>{row.estoque.itemEstoque.map(item => item.produto.unidadeMedida.unidadeMedida)}</TableCell>
                                <TableCell>{row.estoque.itemEstoque.map(item => item.fornecedor.name)}</TableCell>
                                <TableCell>{row.estoque.itemEstoque.map(item => item.quantidadeAtual)}</TableCell>
                                <TableCell>{row.usuario.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totalElements === 0 && !isLoading && (
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <LinearProgress variant='indeterminate' />
                                </TableCell>
                            </TableRow>
                        )}

                        {totalPages > 0 && totalElements > 5 && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Pagination
                                        page={pagina}
                                        count={totalPages}
                                        onChange={
                                            (_, newPage) => 
                                            setSearchParams({ 
                                                busca, pagina: (newPage).toString(), 
                                                paginaAPI: (newPage = newPage - 1).toString()}, 
                                            { replace: true }
                                            )
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>

        </LayoutBasePagina>
    );
};
