import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, LinearProgress, Pagination, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, useTheme, Box, Grid, InputLabel, Typography, Stack, Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import * as yup from 'yup';
import { VForm, VSwitch, VTextField, useVForm } from '../../forms';
import { AutoCompleteUnidadeMedida, BarraFerramentas } from '../../components';
import { LayoutBasePagina } from '../layouts';
import { Environment } from '../../environment/index';
import { useDebounce } from '../../hooks';
import { ModalCadastro } from '../../components';
import "../../styles/index.css";
import '../../forms/TraducoesYup';
import { Close } from '@mui/icons-material';
import { ProdutoService } from '../../services/api/produtos/ProdutoService';
const formValidationSchema = yup.object().shape({
    idProduto: yup.number().nullable(),
    nome: yup.string().required(),
    status: yup.number().required(),
    UnidadeMedidaFK: yup.number().required()
});
export const Produtos = () => {
    const theme = useTheme();
    const { formRef, save } = useVForm();
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(3000, true);
    const [rows, setRows] = useState([]);
    const [dadoProduto, setdadoProduto] = useState();
    const [isLoading, setIsLoading] = useState(true); //verificar se foi carregado os dados no backend
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [open, setOpen] = useState(false);
    const [AlertTipo, setAlertTipo] = useState(false);
    const [AlertMsg, setAlertMsg] = useState('');
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);
    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);
    const paginaAPI = useMemo(() => {
        return Number(searchParams.get('paginaAPI') || '0');
    }, [searchParams]);
    const getProdutoById = (pId) => {
        ProdutoService.getById(pId)
            .then((result) => {
            if (result instanceof Error) {
                alert(result.message);
            }
            else {
                setdadoProduto(result);
                formRef.current?.setData({
                    nome: result.nome,
                    status: result.status,
                });
                formRef.current?.setFieldValue("UnidadeMedidaFK", result.unidadeMedida?.idUnidadeMedida);
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
        debounce(() => {
            setIsLoading(true);
            ProdutoService.getAllContaing(paginaAPI, busca)
                .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
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
    const handleDialog = (values) => {
        setOpen(true);
        if (values.action === "I") {
            setAlertTipo(values.type === 'ERRO' ? true : false);
            setAlertMsg(values.message);
            handleClose();
        }
        else {
            setAlertTipo(values.type === 'ERRO' ? true : false);
            setAlertMsg(values.message);
        }
    };
    const handleSave = (dados) => {
        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
            setIsLoading(true);
            ProdutoService.create(dadosValidados)
                .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    handleDialog({ action: 'I', type: 'ERRO', message: result.message });
                }
                else {
                    handleDialog({ action: 'I', type: 'SUCESSO', message: 'Material inserido com sucesso!' });
                }
            });
        })
            .catch((errors) => {
            const validationErrors = {};
            errors.inner.forEach(error => {
                if (!error.path)
                    return; //se path undefined não executa que esta abaixo
                validationErrors[error.path] = error.message;
            });
            formRef.current?.setErrors(validationErrors);
        });
    };
    const handleUpdate = (dados) => {
        console.log(dados);
        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
            setIsLoading(true);
            //@ts-ignore
            ProdutoService.updateById(dadoProduto?.idProduto, dadosValidados)
                .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    setOpen(true);
                    setAlertTipo(true);
                    setAlertMsg(result.message);
                }
                else {
                    setAlertTipo(false);
                    setOpen(true);
                    setAlertMsg('Produto atualizado com Sucesso!');
                    handleCloseEdit();
                    window.location.reload();
                }
            });
        })
            .catch((errors) => {
            const validationErrors = {};
            errors.inner.forEach(error => {
                if (!error.path)
                    return; //se path undefined não executa que esta abaixo
                validationErrors[error.path] = error.message;
            });
            formRef.current?.setErrors(validationErrors);
        });
    };
    return (<LayoutBasePagina renderTabela titulo="Cadastro de Produtos" subTitulo="Gerenciamento de Produtos" totalElements={(totalElements >= 0 && totalElements < 3 ? 32 : 62) || (totalElements > 5 ? 65 : 65)} barraFerramentas={<BarraFerramentas textoBotaoNovo="NOVO PRODUTO" mostrarInputBusca mostrarBotaoNovo textoDaBusca={busca} aoClicarEmNovo={handleOpen} aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1', paginaAPI: '0' }, { replace: true })}/>}>
            <TableContainer sx={{ height: "500px", margin: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Produto</TableCell>
                            <TableCell>Unidade de Medida</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (<TableRow key={row.idProduto}>
                                <TableCell>{row.nome}</TableCell>
                                <TableCell>{row.unidadeMedida.unidadeMedida}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell width={200}>
                                    <Button variant="contained" color="warning" disableElevation onClick={() => { handleOpenEdit(); getProdutoById(row.idProduto); }} sx={{
                marginRight: theme.spacing(1),
            }}>
                                        Editar
                                    </Button>
                                </TableCell>
                            </TableRow>))}
                    </TableBody>

                    {totalElements === 0 && !isLoading && (<caption>{Environment.LISTAGEM_VAZIA}</caption>)}

                    <TableFooter>
                        {isLoading && (<TableRow>
                                <TableCell colSpan={6}>
                                    <LinearProgress variant='indeterminate'/>
                                </TableCell>
                            </TableRow>)}

                        {totalPages > 0 && totalElements > 5 && (<TableRow>
                                <TableCell colSpan={6}>
                                    <Pagination page={pagina} count={totalPages} onChange={(_, newPage) => setSearchParams({ busca, pagina: (newPage).toString(), paginaAPI: (newPage = newPage - 1).toString() }, { replace: true })}/>
                                </TableCell>
                            </TableRow>)}
                    </TableFooter>
                </Table>
            </TableContainer>

            <ModalCadastro open={openModal} handleClose={handleClose} formSubmit={save} titulo="Adicionar Novo Produto" tituloButtonAdd="Adicionar Produto" heightDialog="300px">

                <VForm ref={formRef} onSubmit={handleSave}>

                    <Box margin={1} display="flex" flexDirection="column">

                        <Grid container direction="column" padding={2} spacing={2}>

                            <Grid container item direction="row" spacing={1}>

                                <Grid item md={6}>
                                    <VTextField name="nome" label="Produto" variant="outlined" type="text" sx={{
            "& input": { border: 'none',
                margin: 2,
                padding: 1,
                paddingY: 0,
                paddingRight: 0
            },
        }} fullWidth/>
                                </Grid>
                                <Grid item md={6}>
                                    <AutoCompleteUnidadeMedida name="UnidadeMedidaFK" isExternalLoading={isLoading} isEdit={false}/>
                                </Grid>

                            </Grid>

                            <Grid container item direction="row" spacing={2}>
                                <Grid item md={6}>
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

            <ModalCadastro open={openModalEdit} handleClose={handleCloseEdit} formSubmit={save} titulo="Editar Produto" tituloButtonEdit="Salvar Produto" edit={openModalEdit}>

                <VForm ref={formRef} onSubmit={handleUpdate}>
                    <Box margin={1} display="flex" flexDirection="column">
                        <Grid container direction="column" padding={2} spacing={2}>

                            <Grid container item direction="row" spacing={1}>

                                <Grid item md={6}>
                                    <VTextField name="nome" label="Produto" variant="outlined" type="text" sx={{
            "& input": { border: 'none',
                margin: 2,
                padding: 1,
                paddingY: 0,
                paddingRight: 0
            },
        }} fullWidth/>
                                </Grid>

                                <Grid item md={6}>
                                    <AutoCompleteUnidadeMedida name="UnidadeMedidaFK" isExternalLoading={isLoading} isEdit={true}/>
                                </Grid>
                            </Grid>

                            <Grid container item direction="row" spacing={2}>
                                <Grid item md={6}>
                                    <InputLabel>Status</InputLabel>
                                    
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography>Inativo</Typography>
                                        <VSwitch name="status" edit={true}/>
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
                    <Alert severity={AlertTipo ? "error" : "success"} color={AlertTipo ? "error" : "success"} action={<IconButton onClick={() => { setOpen(false); }}>
                                <Close />
                            </IconButton>}>
                        <AlertTitle>{AlertTipo ? "Erro" : "Sucesso"}</AlertTitle>
                            {AlertMsg}
                    </Alert>
                </Collapse>
            </Box>
          
        </LayoutBasePagina>);
};
