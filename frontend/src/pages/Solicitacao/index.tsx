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
    IconButton,
    Button
}
from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

import { VForm, useVForm } from '../../forms';

import { BarraFerramentas } from '../../components';

import { LayoutBasePagina } from '../layouts';
import { Environment } from '../../environment/index';

import { useDebounce } from '../../hooks';
import { ModalCadastro } from '../../components';

import '../../forms/TraducoesYup';
import { Close } from '@mui/icons-material';


import { DecodeTokenJWT } from '../../services/api/auth/decode/DecodeTokenJWT';
import { FormSolicitacao } from './component/ItemSolicitacao';
import { ItemSolicitacao } from './component/ItemSolicitacao/item';
import { IlistagemSolicitacao, SolicitacaoMateriais } from '../../services/api/solicitacao/SolicitacaoMateriais';
import { ModalSolicitacao } from './component/modal';


interface IListagemItens {
    produtoFK: number;
    quantidade: number;
    observacao: string;
}

interface IDialogHandle {
    action: "I" | "D";
    type: "ERRO" | "SUCESSO";
    message: string;
}

export const Solicitacao: React.FC = () => {

    const { formRef, save } = useVForm();
    
    //@ts-ignore
    const usuarioToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario;
    
    //@ts-ignore
    const filialToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario.filialFK;

    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const { debounce } = useDebounce(3000, true);
    
    const [rows, setRows] = useState<IlistagemSolicitacao[]>([]);
    
    const [rowsItem, setRowsItens] = useState<IListagemItens[]>([]);
    
    const[solicitacao, setSolicitacao] = useState<IlistagemSolicitacao>();

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

    const handleOpenEdit = () => {
        setOpenModalEdit(true);
    };


    const handleClose = () => {
        setOpenModal(false);
    };

    const handleCloseEdit = () => {
        setOpenModalEdit(false);
    };

    const getSolicitacaoById = (id: number) => {
        SolicitacaoMateriais.getById(id)
        .then((result) => {
            if(result instanceof Error) {
                alert(result.message);
            }
            else {
                setSolicitacao(result);
            }
        });
    };
    
    const addItem = (valor: IListagemItens) => {
        var index = false;

        rowsItem.find((item) => {
            if(item.produtoFK === valor.produtoFK) {
                index = true;
            } 
        });

        if(index) {
            formRef.current?.setFieldError("itensSolicitacao[0].produtoFK", "Produto já adicionado no pedido!");
            
            formRef.current?.setFieldValue('itensSolicitacao[0].quantidade', '');
            formRef.current?.setFieldValue('itensSolicitacao[0].observacao', '');  
        }
        else if(valor.produtoFK === 0) {
            formRef.current?.setFieldError("itensSolicitacao[0].produtoFK", "Adicione um produto!");
        }
        else if (valor.quantidade <= 0) {
            formRef.current?.setFieldError("itensSolicitacao[0].quantidade", "Quantidade inválida!");
        }
        else {
            setRowsItens([...rowsItem, valor]);
        }
    };

    const removeItem = (id: number) => {
        const newItens = [...rowsItem];
        const filteredItem = newItens.filter((item) =>
            item.produtoFK !== id ? item : null
        );
        setRowsItens(filteredItem);
    };
    
    useEffect(() => {
        debounce(()=> {
            setIsLoading(true);

            SolicitacaoMateriais.getAllContaing(paginaAPI, busca, filialToken)
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

    const handleSave = () => {
        //var dados: any;
        const dataHora = new Date().toISOString();
        const itensSolicitacao = [...rowsItem];
        const state = {
            solicitanteFK: usuarioToken.idUsuario,
            filialFK: filialToken,
            status: 0,
            statusPedido: 0,
            dataSolicitacao: '',
            updatedAt: '',
            itensSolicitacao: itensSolicitacao,
        }
        
        const dados = state;
        dados.dataSolicitacao = dataHora.slice(0,19)+"Z";
        dados.updatedAt = dataHora.slice(0,19)+"Z";
        dados.solicitanteFK = usuarioToken.idUsuario;
        dados.filialFK = filialToken;
        dados.status = 0;
        dados.itensSolicitacao = itensSolicitacao;
        dados.statusPedido = 3;

        if(itensSolicitacao.length === 0) {
            return;
        } else {
            setIsLoading(true);
            
            //@ts-ignore
            SolicitacaoMateriais.create(dados)
            .then((result) => {
                setIsLoading(false);
                if(result instanceof Error) {
                    handleDialog({ action: 'I', type: 'ERRO', message: result.message });
                }
                else {
                    handleDialog({ action: 'I', type: 'SUCESSO', message: 'Requisção realizada com sucesso!' });
                }
            });
        }
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
                            <TableCell>Emissão</TableCell>
                            <TableCell>Solicitante</TableCell>
                            <TableCell>Detalhes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.idSol}>
                                <TableCell>
                                    {
                                        row.status === "APROVADA" &&(
                                        <Button
                                            variant="contained"
                                            color="success"
                                            disableElevation
                                        >{row.status}</Button>
                                        )
                                    }
                                    {
                                        row.status === "ABERTA" &&(
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                disableElevation
                                            >{row.status}</Button>
                                        )
                                    }
                                    {
                                        row.status === "REPROVADA" &&(
                                            <Button
                                                variant="contained"
                                                color="error"
                                                disableElevation
                                            >{row.status}</Button>
                                        )
                                    }
                                </TableCell>
                                <TableCell>{row.numeroSol}</TableCell>
                                <TableCell>{new Date(row.dataSolicitacao).toLocaleString().replace(/,/,'')}</TableCell>
                                <TableCell>{row.solicitante.name}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="text"
                                        color="secondary"
                                        disableElevation                             
                                        onClick={() => { handleOpenEdit(); getSolicitacaoById(row.idSol); }}
                                    >
                                        ...
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
                                            <TableCell>Ação</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowsItem.map(row => (
                                            <TableRow key={row.produtoFK}>
                                                <ItemSolicitacao 
                                                    item={row} 
                                                    buttonRm={
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            disableElevation
                                                            onClick={() => removeItem(row.produtoFK)}
                                                        >
                                                            Remover
                                                        </Button>
                                                    }
                                                />                                         
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    {rowsItem.length === 0 &&(
                                        <caption>Lista Vazia</caption>
                                    )}
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Box>
                </VForm>
            </ModalCadastro>
            <ModalSolicitacao 
                open={openModalEdit} 
                handleClose={handleCloseEdit}
                heightDialog="300px"
                solicitacao={solicitacao}
            />

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
