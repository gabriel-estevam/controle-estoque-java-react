import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Button, 
    LinearProgress, 
    Pagination, 
    Table, 
    TableBody, 
    TableCell, 
    TableFooter, 
    TableHead, 
    TableRow, 
    useTheme,
    Box, 
    Grid, 
    InputLabel,
    Typography, 
    Stack }
from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import * as yup from 'yup';

import { IVFormErrors, VForm, VSwitch, VTextField, useVForm } from '../../forms';

import { AutoCompleteUsuario, BarraFerramentas } from '../../components';

import { LayoutBasePagina } from '../layouts';
import { Environment } from '../../environment/index';
import { IListagemUsuario, UsuarioService } from '../../services/api/usuarios/UsuarioService';
import { useDebounce } from '../../hooks';
import { ModalCadastro } from '../../components';

import "../../styles/index.css";
import { AutoCompleteFilial } from '../../components/Autocomplete/Filial/index';

import '../../forms/TraducoesYup';

interface IFormData {
    name: string;
    email: string;
    password: string;
    role: number;
    status: number;
    filialFK: number;
    //filialName: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
    role: yup.number().required(),
    status: yup.number().required(),
    filialFK: yup.number().required(),
});

export const Usuarios: React.FC = () => {
    const theme = useTheme();
    const { formRef, save } = useVForm();

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

    const handleSave = (dados: IFormData) => {
        formValidationSchema
        .validate(dados, {abortEarly: false})
        .then((dadosValidados) => {
            setIsLoading(true);
            UsuarioService.create(dadosValidados)
            .then((result) => {
                setIsLoading(false);

                if(result instanceof Error) {
                    alert(result.message);
                }
                else {
                    alert(result);
                    handleClose();
                }
            });
           
        })
        .catch((errors: yup.ValidationError) => {
            const validationErrors: IVFormErrors = {};
            errors.inner.forEach(error => {
                if(!error.path) return; //se  path undefined não executa que esta abaixo
                validationErrors[error.path] = error.message;
            });

            formRef.current?.setErrors(validationErrors);
        });
        
        //console.log(dados);
    };
    return (
        <LayoutBasePagina
            renderTabela
            titulo="Cadastro de Usuários"
            subTitulo="Gerenciamento de Usuários"
            totalElements={totalElements === 0 ? 20 : 62}
            barraFerramentas={
                <BarraFerramentas
                    textoBotaoNovo="NOVO USUÁRIO"
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
            <ModalCadastro 
                open={openModal}
                handleClose={handleClose}
                formSubmit={save}
                titulo="Adicionar Novo Usuário">
      
                <VForm ref={formRef} onSubmit={handleSave}>

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
                                    <AutoCompleteUsuario />
                                </Grid>

                                <Grid item md={6}>
                                    <AutoCompleteFilial isExternalLoading={isLoading} />
                                </Grid>
                            </Grid>

                            <Grid container item direction="row" spacing={2}>

                                <Grid item>
                
                                    <InputLabel>Status</InputLabel>
                                    
                                    <Stack direction="row" spacing={1} alignItems="center">

                                        <Typography>Inativo</Typography>
                                           <VSwitch name="status"/>
                                        <Typography>Ativo</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </VForm>
            </ModalCadastro>
        </LayoutBasePagina>
    );
};