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

import { useDebounce } from '../../hooks';
import { ModalCadastro } from '../../components';

import "../../styles/index.css";

import '../../forms/TraducoesYup';
import { Close } from '@mui/icons-material';

import { FilialService, IDetalheFilial, IEndereco, IListagemFilial } from '../../services/api/filial/FilialService';
import { VInputMask } from '../../forms/VInputMask';
import { PublicService } from '../../services/api/public/PublicService';

interface IFormData {
    name: string;
    cnpj: string;
    phoneNumber: string;
    Endereco: IEndereco;
    status: number;
    usuarioFK: number;
}

interface IDialogHandle {
    action: "I" | "D";
    type: "ERRO" | "SUCESSO";
    message: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    idFilial: yup.number(),
    name: yup.string().required(),
    cnpj: yup.string().required().min(14),
    phoneNumber: yup.string().required(),
    status: yup.number().required(),
    usuarioFK: yup.number().required(),

    Endereco: yup.object({
        logradouro: yup.string().required(),
        cep: yup.string().required(),
        numero: yup.string().required(),
        cidade: yup.string().required(),
        estado: yup.string().required(),
        complemento: yup.string().nullable(),
    }).required(),
});

export const Filiais: React.FC = () => {
    const theme = useTheme();
    const { formRef, save } = useVForm();
    
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const { debounce } = useDebounce(3000, true);
    
    const [rows, setRows] = useState<IListagemFilial[]>([]);
    
    const [dadoFilial, setdadoFilial] = useState<IDetalheFilial>();
    
    const [erroCEP, setErroCEP] = useState(false);

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
    
   const getFilialById = (pId : number) => {
        FilialService.getById(pId)
        .then((result) => {
            if(result instanceof Error) {
                alert(result.message);
            }
            else {
                setdadoFilial(result);
                formRef.current?.setData({
                    name: result.name,
                    cnpj: result.cnpj,
                    phoneNumber: result.phoneNumber,

                    //@ts-ignore
                    Endereco: result.endereco,

                    status: result.status,
                    usuarioFK: result.usuarioFK,
                });
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

            FilialService.getAllContaing(paginaAPI, busca)
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

    const consultaCEP = (cep: string) => {
        PublicService.searchCEP(cep)
        .then((result) => {
            if(result instanceof Error) {
                setErroCEP(true);
                formRef.current?.setFieldValue("Endereco.cidade", cep);
                formRef.current?.setFieldValue("Endereco.logradouro",'');
                formRef.current?.setFieldValue("Endereco.cidade", '');
                formRef.current?.setFieldValue("Endereco.cidade", '');
            }
            else {
                setErroCEP(false);
                formRef.current?.setFieldValue("Endereco.cidade", cep);
                formRef.current?.setFieldValue("Endereco.logradouro", result.street);
                formRef.current?.setFieldValue("Endereco.cidade", result.city);
                formRef.current?.setFieldValue("Endereco.estado", result.state);
            }
        });
    };

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
        }
    }

    const handleSave = (dados: IFormData) => {
        formValidationSchema
        .validate(dados, {abortEarly: false})
        .then((dadosValidados) => {
            setIsLoading(true);
            FilialService.create(dadosValidados)
            .then((result) => {
                setIsLoading(false);

                if(result instanceof Error) {
                    handleDialog({ action: 'I', type: 'ERRO', message: result.message });
                }
                else {
                    handleDialog({ action: 'I', type: 'SUCESSO', message: 'Filial inserida com sucesso!' });
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
            //@ts-ignore
            FilialService.updateById(dadoFilial?.idFilial, dadosValidados)
            .then((result) => {
                setIsLoading(false);
                if(result instanceof Error) 
                {
                    setOpen(true);
                    setAlertTipo(true);
                    setAlertMsg(result.message);
                }
                else 
                {
                    setAlertTipo(false);
                    setOpen(true);
                    setAlertMsg('Filial atualizada com Sucesso!');
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

    return (
        <LayoutBasePagina
            renderTabela
            titulo="Cadastro de Filiais"
            subTitulo="Gerenciamento de Filiais"
            totalElements={(totalElements >=0 && totalElements < 3 ? 32 : 62) || (totalElements > 5 ? 65 : 65)}
            barraFerramentas={
                <BarraFerramentas
                    textoBotaoNovo="NOVA FILIAL"
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
                            <TableCell>CNPJ</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Contato</TableCell>
                            <TableCell>Endereço</TableCell>
                            <TableCell>CEP</TableCell>
                            <TableCell>Numero</TableCell>
                            <TableCell>Complemento</TableCell>
                            <TableCell>Cidade</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.idFilial}>
                                <TableCell>{row.cnpj}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.phoneNumber}</TableCell>
                                <TableCell>{row.endereco.logradouro}</TableCell>
                                <TableCell>{row.endereco.cep}</TableCell>
                                <TableCell>{row.endereco.numero}</TableCell>
                                <TableCell>{row.endereco.complemento}</TableCell>
                                <TableCell>{row.endereco.cidade}</TableCell>
                                <TableCell>{row.endereco.estado}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell width={200}>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        disableElevation
                                        onClick={() => { handleOpenEdit(); getFilialById(row.idFilial); }}
                                        sx={{
                                            marginRight: theme.spacing(1),
                                        }}
                                    >
                                        Editar
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
                titulo="Adicionar Nova Filial"
                tituloButtonAdd="Adicionar Filial"
                tituloButtonEdit="Salvar Filial"
            >

                <VForm ref={formRef} onSubmit={handleSave}>

                    <Box margin={1} display="flex" flexDirection="column">

                        <Grid container direction="column" padding={2} spacing={2}>

                            <Grid container item direction="row" spacing={1}>

                                <Grid item md={6}>
                                    <VTextField
                                        name="name"
                                        label="Nome Filial" 
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
                                    <VInputMask
                                        tipoMask="CNPJ"
                                        name="cnpj"
                                        label="CNPJ" 
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
                            
                                <Grid container item direction="row" spacing={1}>

                                    <Grid item md={6}>
                                        <VInputMask
                                            tipoMask="TELEFONE"
                                            name="phoneNumber"
                                            label="Contato" 
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
                                        <VInputMask
                                            tipoMask="CEP"
                                            name="Endereco.cep"
                                            label="CEP" 
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
                                            onBlur={(e) => { consultaCEP(e.currentTarget.value); }}
                                            error={erroCEP}
                                            helperText={erroCEP && "CEP Inválido"}
                                            onKeyDown={(_) => setErroCEP(false)}
                                            fullWidth
                                        />
                                    </Grid>

                                </Grid>
                                
                                <Grid container item direction="row" spacing={2}>

                                    <Grid item md={6}>
                                    <VTextField
                                            disabled
                                            name="Endereco.logradouro"
                                            label="Endereço" 
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
                                    <VTextField
                                            name="Endereco.numero"
                                            label="Número" 
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

                                    <Grid item md={3}>
                                    <VTextField
                                            disabled
                                            name="Endereco.cidade"
                                            label="Cidade" 
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

                                    <Grid item md={3}>
                                    <VTextField
                                            disabled
                                            name="Endereco.estado"
                                            label="Estado" 
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
                                    <VTextField
                                            name="Endereco.complemento"
                                            label="Complemento" 
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
                                    <InputLabel>Status</InputLabel>
                                    
                                    <Stack direction="row" spacing={1} alignItems="center">

                                        <Typography>Inativo</Typography>
                                           <VSwitch name="status"/>
                                        <Typography>Ativo</Typography>
                                    </Stack>
                                </Grid>

                                <Grid item md={6}>
                                    <AutoCompleteUsuario name="usuarioFK" isExternalLoading={isLoading} isEdit={false} />
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
                titulo="Editar Filial"
                tituloButtonAdd="Adicionar Filial"
                tituloButtonEdit="Salvar Filial"
                edit={openModalEdit}
            >

                <VForm ref={formRef} onSubmit={handleUpdate}>
                    <Box margin={1} display="flex" flexDirection="column">

                        <Grid container direction="column" padding={2} spacing={2}>

                            <Grid container item direction="row" spacing={1}>

                                <Grid item md={6}>
                                    <VTextField
                                        name="name"
                                        label="Nome Filial" 
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
                                    <VInputMask
                                        tipoMask="CNPJ"
                                        name="cnpj"
                                        label="CNPJ" 
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
                            
                                <Grid container item direction="row" spacing={1}>

                                    <Grid item md={6}>
                                        <VInputMask
                                            tipoMask="TELEFONE"
                                            name="phoneNumber"
                                            label="Contato" 
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
                                        <VInputMask
                                            tipoMask="CEP"
                                            name="Endereco.cep"
                                            label="CEP" 
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
                                            onBlur={(e) => { consultaCEP(e.currentTarget.value); }}
                                            error={erroCEP}
                                            helperText={erroCEP && "CEP Inválido"}
                                            onKeyDown={(_) => setErroCEP(false)}
                                            fullWidth
                                        />
                                    </Grid>

                                </Grid>
                                
                                <Grid container item direction="row" spacing={2}>

                                    <Grid item md={6}>
                                    <VTextField
                                            disabled
                                            name="Endereco.logradouro"
                                            label="Endereço" 
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
                                    <VTextField
                                            name="Endereco.numero"
                                            label="Número" 
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

                                    <Grid item md={3}>
                                    <VTextField
                                            disabled
                                            name="Endereco.cidade"
                                            label="Cidade" 
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

                                    <Grid item md={3}>
                                    <VTextField
                                            disabled
                                            name="Endereco.estado"
                                            label="Estado" 
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
                                    <VTextField
                                            name="Endereco.complemento"
                                            label="Complemento" 
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
                                    <InputLabel>Status</InputLabel>
                                    
                                    <Stack direction="row" spacing={1} alignItems="center">

                                        <Typography>Inativo</Typography>
                                        <VSwitch name="status" edit={true} />
                                        <Typography>Ativo</Typography>
                                    </Stack>
                                </Grid>

                                <Grid item md={6}>
                                    <AutoCompleteUsuario name="usuarioFK" isExternalLoading={isLoading} isEdit={true} />
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