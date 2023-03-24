import React, { useEffect, useMemo, useState, useRef } from 'react';
import { LayoutBasePagina } from '../layouts';
import { BarraFerramentas } from '../../components/BarraFerramentas';
import { useSearchParams } from 'react-router-dom';
import { IListagemUsuario, UsuarioService } from '../../services/api/usuarios/UsuarioService';

import {Button, LinearProgress, Pagination, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, useTheme, Box, Grid, Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import { useDebounce } from '../../hooks';
import { Environment } from '../../environment/index';
import { ModalCadastroUsuário } from '../../components/ModalWindow/Cadastro/Usuarios';
import { Form } from '@unform/web';
import { VTextField } from '../../forms';
import { FormHandles } from '@unform/core';

import "./index.css";

export const Usuarios: React.FC = () => {
    const theme = useTheme();
    
    const formRef = useRef<FormHandles>(null);

    const [openModal, setOpenModal] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(3000, true);
    const [rows, setRows] = useState<IListagemUsuario[]>([]);
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

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const [role, setRole] = React.useState(1);

    const handleChange = (event: SelectChangeEvent) => {
        setRole(Number(event.target.value));
        console.log(event.target.value);
    };
    useEffect(() => {
        debounce(()=> {
            setIsLoading(true);

            UsuarioService.getAll(paginaAPI, busca)
            .then((result) => {
                setIsLoading(false);
    
                if(result instanceof Error) {
                    alert(result.message);
                }
                else {
                    //console.log(result.content);
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
            titulo="Cadastro de Usuários"
            subTitulo="Gerenciamento de Usuários"
            totalElements={totalElements === 0 ? 20 : 62}
            barraFerramentas={
                <BarraFerramentas
                    textoBotaoNovo="NOVO"
                    mostrarInputBusca
                    mostrarBotaoNovo
                    textoDaBusca={busca}
                    aoClicarEmNovo={handleOpen}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1', paginaAPI: '0' }, { replace: true })}
                />
            }
        >
            <TableContainer sx={{ height: "500px", margin: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
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
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.filialName}</TableCell>
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

                        {totalPages > 0 && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Pagination
                                        page={pagina}
                                        count={totalPages}
                                        onChange={(_, newPage) => setSearchParams({ busca, pagina: (newPage).toString(), paginaAPI: (newPage = newPage - 1).toString() }, { replace: true })
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
            <ModalCadastroUsuário 
                open={openModal}
                handleClose={handleClose}
                formSubmit={() => formRef.current?.submitForm()}
                titulo="Novo Usuário">
      
                <Form ref={formRef} onSubmit={(dados) => console.log(dados)}>
                    <Box margin={1} display="flex" flexDirection="column">
                        <Grid container direction="column" padding={2} spacing={2}>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item md={12}>
                                    <VTextField
                                        name="name"
                                        label="Nome Completo" 
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                        // "& fieldset": { border: 'none' },
                                            "& input": {border: 'none', 
                                                        margin: 2, 
                                                        padding: 1, 
                                                        paddingY:0,
                                                        paddingRight: 0
                                            },
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item direction="row" spacing={2}>
                                <Grid item md={6}>
                                    <VTextField
                                        name="email"
                                        label="E-mail" 
                                        variant="outlined"
                                        type="email"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item md={6}>
                                    <VTextField
                                        name="password"
                                        label="Senha" 
                                        variant="outlined"
                                        type="password"
                                        sx={{
                                            // "& fieldset": { border: 'none' },
                                            "& input": {border: 'none', 
                                                        margin: 2, 
                                                        padding: 1, 
                                                        paddingY:0,
                                                        paddingRight: 0
                                            },
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            
                            <Grid container item direction="row" spacing={2}>
                                <Grid item md={6}>
                                    <InputLabel>Tipo Usuário</InputLabel>
                                    <Select
                                       // label="Tipo Usuário"
                                        value={role.toString()}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>Administrador</MenuItem>
                                        <MenuItem value={0}>Usuário</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            </ModalCadastroUsuário>
        </LayoutBasePagina>
    );
};