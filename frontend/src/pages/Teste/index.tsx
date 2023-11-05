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
    TableRow,
    Box, 
    Grid, 
    Alert,
    AlertTitle,
    Collapse,
    IconButton}
from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import * as yup from 'yup';

import { IVFormErrors, VForm, useVForm } from '../../forms';

import { BarraFerramentas } from '../../components';

import { LayoutBasePagina } from '../layouts';
import { Environment } from '../../environment/index';

import { useDebounce } from '../../hooks';
import { ModalCadastro } from '../../components';

import '../../forms/TraducoesYup';
import { Close } from '@mui/icons-material';


import { DecodeTokenJWT } from '../../services/api/auth/decode/DecodeTokenJWT';
import { EstoqueEntradaService, IListagemEstoqueEntrada } from '../../services/api/estoque/EstoqueEntrada';
import { FormSolicitacao } from './component/ItemSolicitacao';
import { ItemSolicitacao } from './component/ItemSolicitacao/item';

interface IItemEstoque {
    fornecedorFK: number | undefined;
    produtoFK: number | undefined;
    quantidadeAtual: number | undefined;
    quantidadeIdeal: number | undefined;
    quantidadeMinima: number | undefined;
    quantidadeMaxima: number | undefined;
}

interface IListagemItens {
    produtoFK: number;
    quantidade: number;
    observacao: string; 
}

interface IFormData {
    idEstoque: number | null | undefined;
    dataEntrada: string;
    itensEstoque: IItemEstoque[] | undefined;
    usuarioFK: number;
    filialFK: number;
}

interface IDialogHandle {
    action: "I" | "D";
    type: "ERRO" | "SUCESSO";
    message: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    idEstoque: yup.number().nullable(),
    dataEntrada: yup.string().required(),
    filialFK: yup.number().required(),
    usuarioFK: yup.number().required(),
    itensEstoque: yup.array(
        yup.object({
        quantidadeAtual: yup.number(),
        quantidadeIdeal: yup.number(),
        quantidadeMinima: yup.number(),
        quantidadeMaxima: yup.number(),
        fornecedorFK: yup.number(),
        produtoFK: yup.number(),
    })),

});

export const Teste: React.FC = () => {

    const { formRef, save } = useVForm();
    
    //@ts-ignore
    const usuarioToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario;

    //@ts-ignore
    const filialToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario.filialFK;

    const [openModal, setOpenModal] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const { debounce } = useDebounce(3000, true);
    
    const [rows, setRows] = useState<IListagemEstoqueEntrada[]>([]);

    const [rowsItem, setRowsItens] = useState<IListagemItens[]>([]);

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

    const handleDelete = (id: number) => {
        const deletar = window.confirm("Deseja realmente deletar esse item?");
        if(deletar) {
            EstoqueEntradaService.deleteById(id)
            .then((result) => {
                if(result instanceof Error) {
                    handleDialog({ action: 'D', type: 'ERRO', message: result.message })
                }
                else {
                    handleDialog({ action: 'D', type: 'SUCESSO', message: 'Material deletado com sucesso!' });
                }
            });
        }
    };
    const addItem = (valor: IListagemItens) => {
        setRowsItens([...rowsItem, valor]);
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

        const dataHora = new Date(dados.dataEntrada).toISOString();
        dados.dataEntrada = dataHora.slice(0,19)+"Z";
        
       formValidationSchema
        .validate(dados, {abortEarly: false})
        .then((dadosValidados) => {
            setIsLoading(true);
            //@ts-ignore
            EstoqueEntradaService.create(dadosValidados)
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
            titulo="Requisição de Materiais"
            subTitulo="Materiais Requisitados"
            totalElements={(totalElements >=0 && totalElements < 3 ? 32 : 62) || (totalElements > 5 ? 65 : 65)}
            barraFerramentas={
                <BarraFerramentas
                    textoBotaoNovo="NOVA SOLICITAÇÃO"
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
                            <TableCell>Status</TableCell>
                            <TableCell>Número Solicitação</TableCell>
                            <TableCell>Produto</TableCell>
                            <TableCell>Unidade de Medida</TableCell>
                            <TableCell>Quantidade</TableCell>
                            <TableCell>Observação</TableCell>
                            <TableCell>Emissão</TableCell>
                            <TableCell>Solicitante</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.idEstoque}>
                               <TableCell>{new Date(row.dataEntrada).toLocaleString().replace(/,/,'')}</TableCell>
                                <TableCell>{row.itemEstoque.map(item => item.produto.nome)}</TableCell>
                                <TableCell>{row.itemEstoque.map(item => item.produto.unidadeMedida.unidadeMedida)}</TableCell>
                                <TableCell>{row.itemEstoque.map(item => item.quantidadeAtual)}</TableCell>
                                <TableCell>{row.itemEstoque.map(item => item.quantidadeIdeal)}</TableCell>
                                <TableCell>{row.itemEstoque.map(item => item.quantidadeMinima)}</TableCell>
                                <TableCell>{row.itemEstoque.map(item => item.quantidadeMaxima)}</TableCell>
                                <TableCell>{row.itemEstoque.map(item => item.quantidadeMaxima)}</TableCell>
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
                titulo="Adicionar novo Material ao Estoque"
                tituloButtonAdd="Adicionar Material"
                heightDialog="300px"
            >

                <VForm ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display="flex" flexDirection="column">
                    <Grid container direction="column" padding={2} spacing={2}>
                        <Grid container item direction="row" spacing={1}>
                            <FormSolicitacao addItem={addItem}/>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Produto</TableCell>
                                            <TableCell>Unidade de Medida</TableCell>
                                            <TableCell>Quantidade</TableCell>
                                            <TableCell>Observação</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowsItem.map(row => (
                                            <TableRow key={row.produtoFK}>
                                                <ItemSolicitacao item={row}/>                                         
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
