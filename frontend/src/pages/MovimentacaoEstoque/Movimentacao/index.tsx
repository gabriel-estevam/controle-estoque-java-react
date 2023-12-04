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
    Box, 
    Grid, 
    Alert,
    AlertTitle,
    Collapse,
    IconButton, 
}
from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import * as yup from 'yup';

import { IVFormErrors, VDateTimeField, VForm, VTextField, useVForm } from '../../../forms';

import { AutoCompleteFornecedor, AutoCompleteProduto, BarraFerramentas } from '../../../components';

import { LayoutBasePagina } from '../../layouts';
import { Environment } from '../../../environment/index';

import { useDebounce } from '../../../hooks';
import { ModalCadastro } from '../../../components';

import '../../../forms/TraducoesYup';
import { Close } from '@mui/icons-material';


import { DecodeTokenJWT } from '../../../services/api/auth/decode/DecodeTokenJWT';
import { EstoqueEntradaService, IDetalheEstoqueEntrada, IListagemEstoqueEntrada } from '../../../services/api/estoque/EstoqueEntrada';
import { EstoqueSaidaService } from '../../../services/api/estoque/EstoqueSaida';

interface IFormData {
    estoqueFK: number;
    usuarioFK: number;
    filialFK: number;
    produtoFK: number;
    fornecedorFK: number;
    data: string;
    quantidade: number;
}

interface IDialogHandle {
    action: "I" | "D";
    type: "ERRO" | "SUCESSO";
    message: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    estoqueFK: yup.number().required(),
    data: yup.string().required(),
    quantidade: yup.number().min(1).required(),
    filialFK: yup.number().required(),
    usuarioFK: yup.number().required(),
    produtoFK: yup.number().required(),
    fornecedorFK: yup.number().required(),

});

export const MovimentacaoEstoque: React.FC = () => {

    const { formRef, save } = useVForm();
    
    //@ts-ignore
    const usuarioToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario;

    //@ts-ignore
    const filialToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario.filialFK;

    const [openModal, setOpenModal] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const { debounce } = useDebounce(3000, true);
    
    const [rows, setRows] = useState<IListagemEstoqueEntrada[]>([]);
    const [dadoEstoque, setDadoEstoque] = useState<IDetalheEstoqueEntrada>();
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

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const getEstoqueById = (pId : number) => {
        EstoqueEntradaService.getById(pId)
        .then((result) => {
            if(result instanceof Error) {
                alert(result.message);
            }
            else {
                setDadoEstoque(result);
                formRef.current?.setData({
                    itensEstoque: result.itensEstoque,
                });
            }
        });
   };

    useEffect(() => {
        debounce(()=> {
            setIsLoading(true);

            EstoqueEntradaService.getAllContaing(paginaAPI, busca, filialToken)
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
        }
    }

    const handleSave = (dados: IFormData) => {
        dados.usuarioFK = usuarioToken.idUsuario;
        dados.filialFK = filialToken;

        //@ts-ignore
        dados.estoqueFK = dadoEstoque?.idEstoque;

        const dataHora = new Date(dados.data).toISOString();
        dados.data = dataHora.slice(0,19)+"Z";

        //@ts-ignore
        dados.produtoFK = dadoEstoque?.itensEstoque[0].produtoFK;
        //@ts-ignore
        dados.fornecedorFK = dadoEstoque?.itensEstoque[0].fornecedorFK;
        console.log(dados)
        
       formValidationSchema
        .validate(dados, {abortEarly: false})
        .then((dadosValidados) => {
            setIsLoading(true);
            EstoqueSaidaService.create(dadosValidados)
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

    return (
        <LayoutBasePagina
            renderTabela
            titulo="Movimentação de Estoque"
            subTitulo="Materiais em Estoque"
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
                            <TableCell>Produto</TableCell>
                            <TableCell>Unidade de Medida</TableCell>
                            <TableCell>Fornecedor</TableCell>
                            <TableCell>Quantidade Atual</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.idEstoque}>
                                <TableCell>{row.itemEstoque.map(item => item.produto.nome)}</TableCell>
                                <TableCell>{row.itemEstoque.map(item => item.produto.unidadeMedida.unidadeMedida)}</TableCell>
                                <TableCell>{row.itemEstoque.map(item => item.fornecedor.name)}</TableCell>
                                <TableCell>{row.itemEstoque.map(item => item.quantidadeAtual)}</TableCell>
                            
                                <TableCell width={200}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        onClick={() => { handleOpen() ;getEstoqueById(row.idEstoque) }}
                                    >
                                        Movimentar Item
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

            <ModalCadastro 
                open={openModal}
                handleClose={handleClose}
                formSubmit={save}
                titulo="Movimentação de Estoque"
                tituloButtonAdd="Movimentar Estoque"
                heightDialog="300px"
            >

                <VForm ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display="flex" flexDirection="column">
                    <Grid container direction="column" padding={2} spacing={2}>
                        <Grid container item direction="row" spacing={1}>
                            <Grid item md={3}>
                                <VTextField 
                                    name="quantidade"
                                    label="Qtde.Atual" 
                                    variant="outlined"
                                    type="number"
                                />
                            </Grid>
                       
                            <Grid item md={6}>
                                <AutoCompleteProduto name="itensEstoque[0].produtoFK" isExternalLoading={isLoading} isEdit={true} isMovimentoEstoque={true} />
                            </Grid>


                        </Grid>

                        <Grid container item direction="row" spacing={3}>
                            <Grid item md={6}>
                                <AutoCompleteFornecedor name="itensEstoque[0].fornecedorFK" isExternalLoading={isLoading} isEdit={false} isMovimentoEstoque={true} />
                            </Grid>
                            
                            <Grid item md={6}>
                                <VDateTimeField 
                                    disabled
                                    name="data" 
                                    label="Data de Movimentação" 
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
