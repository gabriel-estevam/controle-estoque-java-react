import React, { useEffect, useMemo, useState } from 'react';
import { LayoutBasePagina } from '../layouts';
import { BarraFerramentas } from '../../components/BarraFerramentas';
import { useSearchParams } from 'react-router-dom';
import { IListagemUsuario, UsuarioService } from '../../services/api/usuarios/UsuarioService';

import { Button, LinearProgress, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, useTheme } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import { useDebounce } from '../../hooks';
import { Environment } from '../../environment/index';

export const Usuarios: React.FC = () => {
    const theme = useTheme();

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(3000, true);
    const [rows, setRows] = useState<IListagemUsuario[]>([]);
    const [isLoading, setIsLoading] = useState(true); //verificar se foi carregado os dados no backend
    const [totalElements, setTotalElements] = useState(0);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    },[searchParams]);

    useEffect(() => {
        debounce(()=> {
            setIsLoading(true);

            UsuarioService.getAll(0, busca)
            .then((result) => {
                setIsLoading(false);
    
                if(result instanceof Error) {
                    alert(result.message);
                }
                else {
                  setTotalElements(result.totalElements);
                  setRows(result.content);
                }
            });
        });
    }, [busca]);

    return (
        <LayoutBasePagina
            renderTabela
            titulo="Cadastro de Usuários"
            subTitulo="Gerenciamento de Usuários"
            totalElements={totalElements === 0 ? 20 : 50}
            barraFerramentas={
                <BarraFerramentas
                    textoBotaoNovo="NOVO"
                    mostrarInputBusca
                    mostrarBotaoNovo
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }
        >
            <TableContainer sx={{ height: "369px", margin: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Login</TableCell>
                            <TableCell>Tipo Usuário</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Filial</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.filialId}</TableCell>
                                <TableCell width={200}>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        disableElevation
                                        sx={{
                                            marginRight: theme.spacing(1),
                                        }}
                                    >
                                        Editar
                                    </Button>
    
                                    <Button
                                        variant="contained"
                                        color="error"
                                        disableElevation
                                    >
                                        Deletar
                                    </Button>
                                </TableCell>
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
                    </TableFooter>
                </Table>
            </TableContainer>
            
        </LayoutBasePagina>
    );
};