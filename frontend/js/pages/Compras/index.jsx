import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LinearProgress, Pagination, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Box, Grid, Alert, AlertTitle, Collapse, IconButton, Button } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import { VForm, useVForm } from '../../forms';
import { AutoCompleteStatus, BarraFerramentas } from '../../components';
import { LayoutBasePagina } from '../layouts';
import { Environment } from '../../environment/index';
import { useDebounce } from '../../hooks';
import { ModalCadastro } from '../../components';
import '../../forms/TraducoesYup';
import { Close } from '@mui/icons-material';
import { DecodeTokenJWT } from '../../services/api/auth/decode/DecodeTokenJWT';
import { SolicitacaoMateriais } from '../../services/api/solicitacao/SolicitacaoMateriais';
import { VTextField } from '../../forms/VTextField';
import * as yup from 'yup';
import { ComprasService } from '../../services/api/solicitacao/Compras';
;
;
const formValidationSchema = yup.object().shape({
    numeroSol: yup.number().required(),
    dataSolicitacao: yup.string().required(),
    solicitante: yup.string().required(),
    status: yup.number().required(),
    statusPedido: yup.number().required(),
});
export const Compras = () => {
    const { formRef, save } = useVForm();
    //@ts-ignore
    const filialToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario.filialFK;
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(3000, true);
    const [rows, setRows] = useState([]);
    const [solicitacao, setSolicitacao] = useState();
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
    const handleOpenEdit = () => {
        setOpenModalEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenModalEdit(false);
    };
    const getSolicitacaoById = (id) => {
        SolicitacaoMateriais.getById(id)
            .then((result) => {
            if (result instanceof Error) {
                alert(result.message);
            }
            else {
                setSolicitacao(result);
                let data = result.dataSolicitacao;
                let status = result.status;
                let statusSol;
                if (status === 'ABERTA') {
                    statusSol = 3;
                }
                else if (status === 'APROVADA') {
                    statusSol = 1;
                }
                else {
                    statusSol = 2;
                }
                const dataEmissao = new Date(data).toLocaleString().replace(/,/, '').split(' ')[0];
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
    };
    useEffect(() => {
        debounce(() => {
            setIsLoading(true);
            SolicitacaoMateriais.getAllContaing(paginaAPI, busca, filialToken)
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
            handleCloseEdit();
        }
        else {
            setAlertTipo(values.type === 'ERRO' ? true : false);
            setAlertMsg(values.message);
        }
    };
    const parseJsonSolicitacao = (dados) => {
        const jsonSolicitacao = dados;
        return {
            updatedAt: jsonSolicitacao.updatedAt.toString(),
            status: 0,
            statusPedido: 0,
            filialFK: jsonSolicitacao.filial.idFilial,
            solicitanteFK: jsonSolicitacao.solicitante.idUsuario,
        };
    };
    const handleSave = (dados) => {
        if (dados.status === 1) {
            dados.statusPedido = 0;
        }
        else if (dados.status === 2) {
            dados.statusPedido = 2;
        }
        else if (dados.status === 3) {
            dados.statusPedido = 3;
        }
        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
            setIsLoading(true);
            const dataHora = new Date().toISOString();
            //@ts-ignore
            const dadosSolicitacao = parseJsonSolicitacao(solicitacao);
            dadosSolicitacao.updatedAt = dataHora.slice(0, 19) + "Z";
            dadosSolicitacao.status = dadosValidados.status;
            dadosSolicitacao.statusPedido = dadosValidados.statusPedido;
            //@ts-ignore
            ComprasService.updateSolicitacao(solicitacao?.idSol, dadosSolicitacao)
                .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    handleDialog({ action: 'I', type: 'ERRO', message: result.message });
                }
                else {
                    handleDialog({ action: 'I', type: 'SUCESSO', message: 'Sucesso!' });
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
    return (<LayoutBasePagina renderTabela titulo="Requisição de Materiais" subTitulo="Materiais Solicitados" totalElements={(totalElements >= 0 && totalElements < 3 ? 32 : 62) || (totalElements > 5 ? 65 : 65)} barraFerramentas={<BarraFerramentas mostrarBotaoNovo={false} mostrarInputBusca textoDaBusca={busca} aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1', paginaAPI: '0' }, { replace: true })}/>}>
            <TableContainer sx={{ height: "500px", margin: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>Número Solicitação</TableCell>
                            <TableCell>Data de Emissão</TableCell>
                            <TableCell>Solicitante</TableCell>
                            <TableCell>Status.Pedido</TableCell>
                            <TableCell>Data de Atualização</TableCell>
                            <TableCell>Detalhes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (<TableRow key={row.idSol}>
                                <TableCell>
                                    {row.status === "APROVADA" && (<Button variant="contained" color="success" disableElevation>{row.status}</Button>)}
                                    {row.status === "ABERTA" && (<Button variant="contained" color="warning" disableElevation>{row.status}</Button>)}
                                    {row.status === "REPROVADA" && (<Button variant="contained" color="error" disableElevation>{row.status}</Button>)}
                                </TableCell>
                                <TableCell>{row.numeroSol}</TableCell>
                                <TableCell>{new Date(row.dataSolicitacao).toLocaleString().replace(/,/, '')}</TableCell>
                                <TableCell>{row.solicitante.name}</TableCell>
                                <TableCell>{row.statusPedido}</TableCell>
                                <TableCell>{new Date(row.updatedAt).toLocaleString().replace(/,/, '')}</TableCell>
                                <TableCell>
                                    <Button variant="text" color="secondary" disableElevation onClick={() => { handleOpenEdit(); getSolicitacaoById(row.idSol); }}>
                                        ...
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
                                    <Pagination page={pagina} count={totalPages} onChange={(_, newPage) => setSearchParams({
                busca, pagina: (newPage).toString(),
                paginaAPI: (newPage = newPage - 1).toString()
            }, { replace: true })}/>
                                </TableCell>
                            </TableRow>)}
                    </TableFooter>
                </Table>
            </TableContainer>

            <ModalCadastro open={openModalEdit} handleClose={handleCloseEdit} formSubmit={save} titulo="Solicitação de Materiais" tituloButtonEdit="Confirmar" edit={openModalEdit}>
                <VForm ref={formRef} onSubmit={handleSave}>
                    <Box margin={1} display="flex" flexDirection="column">

                        <Grid container direction="column" padding={2} spacing={2}>

                            <Grid container item direction="row" spacing={1}>

                                <Grid item md={3}>
                                    <VTextField name="numeroSol" label="Nº Solicitação" variant="outlined" type="text" sx={{
            "& input": { border: 'none',
                margin: 2,
                padding: 1,
                paddingY: 0,
                paddingRight: 0
            },
        }} disabled fullWidth/>
                                </Grid>

                                <Grid item md={3}>
                                    <VTextField name="dataSolicitacao" label="Dt.Emissão" variant="outlined" type="text" sx={{
            "& input": { border: 'none',
                margin: 2,
                padding: 1,
                paddingY: 0,
                paddingRight: 0
            },
        }} disabled fullWidth/>
                                </Grid>

                                <Grid item md={3}>
                                    <VTextField name="solicitante" label="Solicitante" variant="outlined" type="text" sx={{
            "& input": { border: 'none',
                margin: 2,
                padding: 1,
                paddingY: 0,
                paddingRight: 0
            },
        }} disabled fullWidth/>
                                </Grid>

                                <Grid item md={3}>
                                    <AutoCompleteStatus name="status"/>
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
                                            {solicitacao?.itensSolicitados.map(row => (<TableRow key={row.produto.idProduto}>
                                                        <TableCell>{row.produto.nome}</TableCell>
                                                        <TableCell>{row.produto.unidadeMedida.sigla}</TableCell>
                                                        <TableCell>{row.quantidade}</TableCell>
                                                        <TableCell>{row.observacao}</TableCell>
                                                    </TableRow>))}
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
                    <Alert severity={AlertTipo ? "error" : "success"} color={AlertTipo ? "error" : "success"} action={<IconButton onClick={() => { setOpen(false); window.location.reload(); }}>
                                <Close />
                            </IconButton>}>
                        <AlertTitle>{AlertTipo ? "Erro" : "Sucesso"}</AlertTitle>
                            {AlertMsg}
                    </Alert>
                </Collapse>
            </Box>
          
        </LayoutBasePagina>);
};
