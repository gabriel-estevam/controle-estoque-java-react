import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow,
    Box, 
    Grid, 
    Alert,
    AlertTitle,
    Collapse,
    IconButton,
    Button}
from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

import { VDateTimeField, VForm, useVForm } from '../../forms';

import { BarraFerramentas } from '../../components';

import { LayoutBasePagina } from '../layouts';

import { useDebounce } from '../../hooks';
import { ModalCadastro } from '../../components';

import '../../forms/TraducoesYup';
import { Close } from '@mui/icons-material';


import { DecodeTokenJWT } from '../../services/api/auth/decode/DecodeTokenJWT';
import { IlistagemSolicitacao, SolicitacaoMateriais } from '../../services/api/solicitacao/SolicitacaoMateriais';
import { VTextField } from '../../forms/VTextField';

import { RecebimentoService } from '../../services/api/recebimento/RecebimentoService';

interface IDialogHandle {
    action: "I" | "D";
    type: "ERRO" | "SUCESSO";
    message: string;
};

export const Recebimento: React.FC = () => {

    const { formRef, save } = useVForm();
    
    //@ts-ignore
    const filialToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario.filialFK;
    //@ts-ignore
    const usuarioToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario.idUsuario;

    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const { debounce } = useDebounce(3000, true);
    
    const [rows, setRows] = useState<IlistagemSolicitacao[]>([]);
        
    const[solicitacao, setSolicitacao] = useState<IlistagemSolicitacao>();

    const [isLoading, setIsLoading] = useState(true); //verificar se foi carregado os dados no backend

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

    const handleOpenEdit = () => {
        setOpenModalEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenModalEdit(false);
    };

    const getSolicitacaoById = (id: number | undefined | null) => {
        if(id !== undefined) {
            //@ts-ignore
            SolicitacaoMateriais.getById(id)
            .then((result) => {
                if(result instanceof Error) {
                    alert(result.message);
                }
                else {
                    setSolicitacao(result);
                    let data = result.dataSolicitacao;
                    let status = result.status;
                    
                    let statusSol: number;
    
                    if(status === 'ABERTA') {
                        statusSol = 3;
                    } else if(status === 'APROVADA') {
                        statusSol = 1;
                    } else {
                        statusSol = 2;
                    }
    
                    const dataEmissao = new Date(data).toLocaleString().replace(/,/,'').split(' ')[0];
                    formRef.current?.setData({
                        idSol: result.idSol,
                        numeroSol: result.numeroSol,
                        dataSolicitacao: dataEmissao,
                        solicitante: result.solicitante.name,
                        solicitanteFK: result.solicitante.idUsuario,
                        status: statusSol,
                        filial: result.filial.idFilial,
                    });
                }
            });
        }
    };

    useEffect(() => {
        debounce(()=> {
            setIsLoading(true);

            SolicitacaoMateriais.getByStatusAndIdFilial(filialToken)
            .then((result) => {
                setIsLoading(false);
    
                if(result instanceof Error) {
                    alert(result.message);
                }
                else {
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
            handleCloseEdit();
        }
        else {
            setAlertTipo(values.type === 'ERRO' ? true : false);
            setAlertMsg(values.message);
        }
    }

    const handleSave = (dado: any) => {
        const state = {
            notaEntrada: 0,
            dataEntrada: '',
            observacao: 'OK',
            solicitacaoFK: 0,
            usuarioFK: 0,
            filialFK: 0,
        }
        const dados = state;
        const dataHora = new Date().toISOString();
        dados.notaEntrada = dado.notaEntrada;
        dados.dataEntrada = dataHora.slice(0,19)+"Z";
        dados.solicitacaoFK = dado.numeroSol;
        dados.usuarioFK = usuarioToken;
        dados.filialFK = filialToken;
        if((dado.notaEntrada === "") || (dado.notaEntrada === undefined)) {
            formRef.current?.setFieldError("notaEntrada", "Preencha o campo!")
        }
        else {
            console.log(dados)
            //@ts-ignore
            RecebimentoService.create(dados)
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
            titulo="Recebimento de Materiais"
            subTitulo="Materiais Solicitados"
            barraFerramentas={
                <BarraFerramentas
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
                            <TableCell>Status</TableCell>
                            <TableCell>Número Solicitação</TableCell>
                            <TableCell>Data de Emissão</TableCell>
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

                </Table>
            </TableContainer>

            <ModalCadastro
                open={openModalEdit}
                handleClose={handleCloseEdit}
                formSubmit={save}
                titulo="Recebimento de Materiais"
                tituloButtonEdit="Confirmar Recebimento"
                edit={openModalEdit}
            >
                <VForm ref={formRef} onSubmit={handleSave}>
                    <Box margin={1} display="flex" flexDirection="column">

                        <Grid container direction="column" padding={2} spacing={2}>

                            <Grid container item direction="row" spacing={1}>

                                <Grid item md={2}>
                                    <VTextField
                                        name="numeroSol"
                                        label="Solicitação" 
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
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <VTextField
                                        name="dataSolicitacao"
                                        label="Dt.Emissão" 
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
                                        disabled
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item md={3}>
                                    <VTextField
                                        name="solicitante"
                                        label="Solicitante" 
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
                                        disabled
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item md={2}>
                                    <VTextField
                                        name="notaEntrada"
                                        label="Nota.Entrada" 
                                        variant="outlined"
                                        type="number"
                                        
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item md={3}>
                                    <VDateTimeField
                                        name="dataEntrada"
                                        variant="outlined"
                                        sx={{
                                            "& input": {border: 'none', 
                                                        margin: 2, 
                                                        padding: 1, 
                                                        paddingY:0,
                                                        paddingRight: 0
                                            },
                                        }}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>

                            </Grid>

                            <Grid container item direction="row" spacing={1}>

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
                                            {solicitacao?.itensSolicitados.map(row => (
                                                    <TableRow key={row.produto.idProduto}>
                                                        <TableCell>{row.produto.nome}</TableCell>
                                                        <TableCell>{row.produto.unidadeMedida.sigla}</TableCell>
                                                        <TableCell>{row.quantidade}</TableCell>
                                                        <TableCell>{row.observacao}</TableCell>
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
