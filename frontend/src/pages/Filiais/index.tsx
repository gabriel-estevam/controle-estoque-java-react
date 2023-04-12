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
    Stack, 
    Alert,
    AlertTitle,
    Collapse,
    IconButton }
from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import * as yup from 'yup';

import { IVFormErrors, VForm, VSwitch, VTextField, useVForm } from '../../forms';

import { AutoCompleteUsuario, BarraFerramentas } from '../../components';

import { LayoutBasePagina } from '../layouts';
import { Environment } from '../../environment/index';
import { IDetalheUsuario, IListagemUsuario, UsuarioService } from '../../services/api/usuarios/UsuarioService';
import { useDebounce } from '../../hooks';
import { ModalCadastro } from '../../components';

import "../../styles/index.css";
import { AutoCompleteFilial } from '../../components/Autocomplete/Filial/index';

import '../../forms/TraducoesYup';
import { Close } from '@mui/icons-material';

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
    id: yup.number(),
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
    role: yup.number().required(),
    status: yup.number().required(),
    filialFK: yup.number().required(),
});

export const Filiais: React.FC = () => {
    const theme = useTheme();
    const { formRef, save } = useVForm();
    
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const { debounce } = useDebounce(3000, true);
    
    const [rows, setRows] = useState<IListagemUsuario[]>([]);
    
    const [dadoUsuario, setdadoUsuario] = useState<IDetalheUsuario>();
    

    const [isLoading, setIsLoading] = useState(true); //verificar se foi carregado os dados no backend
    
    const [totalElements, setTotalElements] = useState(0);
    
    const [totalPages, setTotalPages] = useState(0);

    const [open, setOpen] = useState(false);
    const [AlertTipo, setAlertTipo] = useState(false);
    const [AlertMsg, setAlertMsg] = useState('');
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    },[searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    },[searchParams]);
    
    const paginaAPI = useMemo(() => {
        return Number(searchParams.get('paginaAPI') || '0');
    },[searchParams]);
    
   const getUsuarioById = (pId : number) => {
        UsuarioService.getById(pId)
        .then((result) => {
            if(result instanceof Error) {
                alert(result.message);
            }
            else {
                setdadoUsuario(result);
                console.log(result);
                formRef.current?.setData({
                    name: result.name,
                    email: result.email,
                    role: result.role === 0 ? 1 : 2,
                    status: result.status,
                    filialFK: result.filialFK,
                    password: 'VALUES',
                })
            }
        });
   };

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleOpenEdit = () => {
        setOpenModalEdit(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleCloseEdit = () => {
        setOpenModalEdit(false);
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
                   // alert(result);
                   setOpen(true);
                    setAlertTipo(true);
                    setAlertMsg(result.message);
                }
                else {
                    //alert(result);
                    setAlertTipo(false);
                    setOpen(true);
                    setAlertMsg('Usuário inserido com Sucesso!');
                    handleClose();
                    window.location.reload();
                }
            });
           
        })
        .catch((errors: yup.ValidationError) => {
            const validationErrors: IVFormErrors = {};
            errors.inner.forEach(error => {
                if(!error.path) return; //se path undefined não executa que esta abaixo
                validationErrors[error.path] = error.message;
            });

            formRef.current?.setErrors(validationErrors);
        });
        
    };

    const handleUpdate = (dados: IFormData) => {
        formValidationSchema
        .validate(dados, {abortEarly: false })
        .then((dadosValidados) => {
            setIsLoading(true);
            UsuarioService.updateById(dadoUsuario?.id, dadosValidados)
            .then((result) => {
                setIsLoading(false);
                if(result instanceof Error) {
                    //alert(result.message);
                    setOpen(true);
                    setAlertTipo(true);
                    setAlertMsg(result.message);
                }
                else {
                    setAlertTipo(false);
                    setOpen(true);
                    setAlertMsg('Usuário atualizado com Sucesso!');
                    //alert(result);
                   handleCloseEdit();
                   window.location.reload();
                }
     
            });
        })
        .catch((errors: yup.ValidationError) => {
            const validationErrors: IVFormErrors = {};
            errors.inner.forEach(error => {
                if(!error.path) return; //se path undefined não executa que esta abaixo
                validationErrors[error.path] = error.message;
            });

            formRef.current?.setErrors(validationErrors);
        });
    };
    const handleDelete = (id: number) => {
        UsuarioService.deleteById(id)
        .then((result) => {
            if(result instanceof Error) {
                alert(result.message);
            }
            else {
                //alert("Usuário Deletado com sucesso!");
                setAlertTipo(false);
                setOpen(true);
                setAlertMsg('Usuário deletado com Sucesso!');
                handleCloseEdit();
                window.location.reload();
            }
        });
    };
    return (
        <LayoutBasePagina
            renderTabela
            titulo="Cadastro de Usuários"
            subTitulo="Gerenciamento de Usuários"
            totalElements={(totalElements >=0 && totalElements < 3 ? 32 : 62) || (totalElements > 5 ? 65 : 65)}
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
                                        onClick={() => { handleOpenEdit(); getUsuarioById(row.id); /*setOpen(true)*/ }}
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
                                        onClick={() => { handleDelete(row.id) }}
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

                        {totalPages > 0 && totalElements > 5 && (
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
                titulo="Adicionar Novo Usuário"
            >

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
                                    <AutoCompleteUsuario name="role" />
                                </Grid>

                                <Grid item md={6}>
                                    <AutoCompleteFilial name="filialFK" isExternalLoading={isLoading} />
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

            <ModalCadastro 
                open={openModalEdit}
                handleClose={handleCloseEdit}
                formSubmit={save}
                titulo="Editar Usuário"
                edit={openModalEdit}
            >

                <VForm ref={formRef} onSubmit={handleUpdate}>

                    <Box margin={1} display="flex" flexDirection="column">

                        <Grid container direction="column" padding={2} spacing={2}>

                            <Grid container item direction="row" spacing={2}>

                                <Grid item md={12}>

                                    <VTextField
                                        //edit={openModalEdit}
                                        name="name"
                                        label="Nome Completo" 
                                        variant="outlined"
                                        type="text"
                                        sx={{
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
                                        //edit={openModalEdit}
                                        name="email"
                                        label="E-mail" 
                                        variant="outlined"
                                        type="email"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item md={6}>

                                    <VTextField
                                        disabled
                                        name="password"
                                        label="Senha" 
                                        variant="outlined"
                                        type="password"
                                        sx={{
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
                                    <AutoCompleteUsuario name="role"  //edit={true} 
                                    />
                                </Grid>

                                <Grid item md={6}>
                                    <AutoCompleteFilial name="filialFK" isExternalLoading={isLoading} />
                                </Grid>
                            </Grid>

                            <Grid container item direction="row" spacing={2}>

                                <Grid item>
                
                                    <InputLabel>Status</InputLabel>
                                    
                                    <Stack direction="row" spacing={1} alignItems="center">

                                        <Typography>Inativo</Typography>
                                           <VSwitch name="status" edit={true} />
                                        <Typography>Ativo</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </VForm>
            </ModalCadastro>

            <Box sx={{
                width: '20%',
                float: 'right',
                
            }}>
            <Collapse in={open}>
            <Alert 
                severity={AlertTipo ? "error" : "success"} 
                color={AlertTipo ? "error" : "success"}
                action={
                    <IconButton
                        onClick={() => { setOpen(false); } }
                    >
                        <Close/>
                    </IconButton>
                }
            >
                <AlertTitle>{AlertTipo ? "Erro" : "Sucesso"}</AlertTitle>
                    {AlertMsg}
            </Alert>
            </Collapse>
        </Box>
          
        </LayoutBasePagina>
    );
};