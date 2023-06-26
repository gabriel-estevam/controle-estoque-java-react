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
    IconButton, 
    TextField}
from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import * as yup from 'yup';

import { IVFormErrors, VForm, VSwitch, VTextField, useVForm } from '../../forms';

import { AutoCompleteFornecedor, AutoCompleteProduto, BarraFerramentas } from '../../components';

import { LayoutBasePagina } from '../layouts';
import { Environment } from '../../environment/index';

import { useDebounce } from '../../hooks';
import { ModalCadastro } from '../../components';

import '../../forms/TraducoesYup';
import { Close } from '@mui/icons-material';


import { DecodeTokenJWT } from '../../services/api/auth/decode/DecodeTokenJWT';
import { IListagemMaterial, IDetalheMaterial, MaterialService } from '../../services/api/materiais/MaterialService';

interface IFormData {
    idMaterial: number| undefined | null;
    quantidadeMinima: number;
    quantidadeMaxima: number;
    quantidadeIdeal: number;
    quantidadeAtual: number;
    status: number;
    ProdutoFK: number;
    FornecedorFK: number;
    UsuarioFK: number;
}

interface IDialogHandle {
    action: "I" | "U";
    type: "ERRO" | "SUCESSO";
    message: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    idMaterial: yup.number().nullable(),
    quantidadeMinima: yup.number().required(),
    quantidadeMaxima: yup.number().required(),
    quantidadeIdeal: yup.number().required(),
    quantidadeAtual: yup.number().required(),
    status: yup.number().required(),
    ProdutoFK: yup.number().required(),
    FornecedorFK: yup.number().required(),
    UsuarioFK: yup.number().required(),
});

export const Materiais: React.FC = () => {
    const theme = useTheme();

    const { formRef, save } = useVForm();
    
    //@ts-ignore
    const usuarioToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario.name;

    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const { debounce } = useDebounce(3000, true);
    
    const [rows, setRows] = useState<IListagemMaterial[]>([]);
    
    const [dadosMateriais, setDadosMateriais] = useState<IDetalheMaterial>();

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
    
   const getMaterialById = (pId : number) => {
        MaterialService.getById(pId)
        .then((result) => {
            if(result instanceof Error) {
                alert(result.message);
            }
            else {
                setDadosMateriais(result);
                formRef.current?.setData({
                    ProdutoFK: result.ProdutoFK,
                    FornecedorFK: result.FornecedorFK,
                    UsuarioFK: result.usuario?.name,
                    quantidadeMinima: result.quantidadeMinima,
                    quantidadeMaxima: result.quantidadeMaxima,
                    quantidadeAtual: result.quantidadeAtual,
                    quantidadeIdeal: result.quantidadeIdeal,
                    status: result.status,
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

    const handleDelete = (id: number) => {
        const deletar = window.confirm("Deseja realmente deletar esse item?");
        if(deletar) {
            MaterialService.deleteById(id)
            .then((result) => {
                if(result instanceof Error) {
                    handleDialog({ action: 'U', type: 'ERRO', message: result.message })
                }
                else {
                    handleDialog({ action: 'U', type: 'SUCESSO', message: 'Material deletado com sucesso!' });
                }
            });
        }
    };

    useEffect(() => {
        debounce(()=> {
            setIsLoading(true);

            MaterialService.getAllContaing(paginaAPI, busca)
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

    const handleDialog = (values: IDialogHandle): void => {
        setOpen(true);
        if(values.action === "I") {
            setAlertTipo(values.type === 'ERRO' ? true : false);
            setAlertMsg(values.message);
            handleClose();
        }
        else {
            setAlertTipo(values.type === 'ERRO' ? true : false);
            setAlertMsg(values.message);
            handleCloseEdit();
        }
    }
    

    const handleSave = (dados: IFormData) => {
        //@ts-ignore
        const usuarioToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token"));
        
        dados.UsuarioFK = usuarioToken.usuario.idUsuario;
        
       formValidationSchema
        .validate(dados, {abortEarly: false})
        .then((dadosValidados) => {
            setIsLoading(true);
            MaterialService.create(dadosValidados)
            .then((result) => {
                setIsLoading(false);

                if(result instanceof Error) {
                    handleDialog({ action: 'I', type: 'ERRO', message: result.message });
                }
                else {
                    handleDialog({ action: 'I', type: 'SUCESSO', message: 'Material inserido com sucesso!' });
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
        //@ts-ignore
        const usuarioToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token"));
        
        dados.UsuarioFK = usuarioToken.usuario.idUsuario;

        formValidationSchema
        .validate(dados, {abortEarly: false })
        .then((dadosValidados) => {
            setIsLoading(true);
            //@ts-ignore
            MaterialService.updateById(dadosMateriais?.idMaterial, dadosValidados)
            .then((result) => {
                setIsLoading(false);
                if(result instanceof Error) 
                {
                    handleDialog({ action: 'U', type: 'ERRO', message: result.message });
                }
                else 
                {
                    handleDialog({ action: 'U', type: 'SUCESSO', message: 'Material atualizado com sucesso!' });
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

    return (
        <LayoutBasePagina
            renderTabela
            titulo="Administração de Materiais"
            subTitulo="Gerenciamento de Materiais"
            totalElements={(totalElements >=0 && totalElements < 3 ? 32 : 62) || (totalElements > 5 ? 65 : 65)}
            barraFerramentas={
                <BarraFerramentas
                    textoBotaoNovo="NOVO MATERIAL"
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
                            <TableCell>Produto</TableCell>
                            <TableCell>Unidade de Medida</TableCell>
                            <TableCell>Quantidade Atual</TableCell>
                            <TableCell>Quantidade Ideal</TableCell>
                            <TableCell>Quantidade Minima</TableCell>
                            <TableCell>Quantidade Máxima</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.idMaterial}>
                                <TableCell>{row.produto.nome}</TableCell>
                                <TableCell>{row.produto.unidadeMedida.unidadeMedida}</TableCell>
                                <TableCell>{row.quantidadeAtual}</TableCell>
                                <TableCell>{row.quantidadeIdeal}</TableCell>
                                <TableCell>{row.quantidadeMinima}</TableCell>
                                <TableCell>{row.quantidadeMaxima}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell width={200}>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        disableElevation
                                        onClick={() => { handleOpenEdit(); getMaterialById(row.idMaterial); }}
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
                                        onClick={() => { handleDelete(row.idMaterial) }}
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
                titulo="Adicionar Novo Material"
                tituloButtonAdd="Adicionar Material"
                heightDialog="300px"
            >

                <VForm ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display="flex" flexDirection="column">
                    <Grid container direction="column" padding={2} spacing={2}>

                        <Grid container item direction="row" spacing={1}>
                            <Grid item md={12}>
                                <AutoCompleteProduto name="ProdutoFK" isExternalLoading={isLoading} isEdit={false} />
                            </Grid>

                            <Grid item md={3}>
                                <VTextField 
                                    name="quantidadeAtual"
                                    label="Qtde.Atual" 
                                    variant="outlined"
                                    type="number"
                                />
                            </Grid>

                            <Grid item md={3}>
                                <VTextField 
                                    name="quantidadeMinima"
                                    label="Qtde.Minima" 
                                    variant="outlined"
                                    type="number"
                                />
                            </Grid>

                            <Grid item md={3}>
                                <VTextField 
                                    name="quantidadeMaxima"
                                    label="Qtde.Maxima" 
                                    variant="outlined"
                                    type="number"
                                />
                            </Grid>

                            <Grid item md={3}>
                                <VTextField 
                                    name="quantidadeIdeal"
                                    label="Qtde.Ideal" 
                                    variant="outlined"
                                    type="number"
                                />
                            </Grid>

                        </Grid>

                        <Grid container item direction="row" spacing={3}>
                            <Grid item md={6}>
                                <AutoCompleteFornecedor name="FornecedorFK" isExternalLoading={isLoading} isEdit={false} />
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    disabled
                                    value={usuarioToken}
                                    name="UsuarioFK"
                                    label="Usuario" 
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

                            <Grid item md={6}>
                                <InputLabel >Status</InputLabel>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography>Inativo</Typography>
                                    <VSwitch name="status" />
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
                titulo="Editar Material"
                tituloButtonEdit="Salvar Material"
                edit={openModalEdit}
            >

                <VForm ref={formRef} onSubmit={handleUpdate}>
                    <Box margin={1} display="flex" flexDirection="column">
                        <Grid container direction="column" padding={2} spacing={2}>

                            <Grid container item direction="row" spacing={1}>
                                <Grid item md={12}>
                                    <AutoCompleteProduto name="ProdutoFK" isExternalLoading={isLoading} isEdit={true} />
                                </Grid>

                                <Grid item md={3}>
                                    <VTextField 
                                        name="quantidadeAtual"
                                        label="Qtde.Atual" 
                                        variant="outlined"
                                        type="number"
                                    />
                                </Grid>

                                <Grid item md={3}>
                                    <VTextField 
                                        name="quantidadeMinima"
                                        label="Qtde.Minima" 
                                        variant="outlined"
                                        type="number"
                                    />
                                </Grid>

                                <Grid item md={3}>
                                    <VTextField 
                                        name="quantidadeMaxima"
                                        label="Qtde.Maxima" 
                                        variant="outlined"
                                        type="number"
                                    />
                                </Grid>

                                <Grid item md={3}>
                                    <VTextField 
                                        name="quantidadeIdeal"
                                        label="Qtde.Ideal" 
                                        variant="outlined"
                                        type="number"
                                    />
                                </Grid>

                            </Grid>

                            <Grid container item direction="row" spacing={2}>
                                <Grid item md={6}>
                                    <AutoCompleteFornecedor name="FornecedorFK" isExternalLoading={isLoading} isEdit={true} />
                                </Grid>

                                <Grid item md={6}>
                                    <VTextField
                                        disabled
                                        name="UsuarioFK"
                                        label="Usuario" 
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

                                <Grid item md={6}>
                                    <InputLabel >Status</InputLabel>
                                    
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
                                onClick={() => { setOpen(false); window.location.reload()} }
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
