import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { IlistagemSolicitacao } from '../../../../services/api/solicitacao/SolicitacaoMateriais';
import { ButtonStatus } from './ButtonStatus';

interface IProps {
    open: boolean;
    heightDialog?: string;
    handleClose: () => void;
    formSubmit: () => void;
    solicitacao?: IlistagemSolicitacao;
};

export const ModalSolicitacao: React.FC<IProps> = 
({ open, 
    handleClose, 
    heightDialog, 
    solicitacao,
    formSubmit
}) => {


    var data: Date;
    //@ts-ignore
    data = solicitacao?.dataSolicitacao;
    let statusSolicitacao : string;

    statusSolicitacao = solicitacao?.status as string

    if(statusSolicitacao === 'APROVADA') {
        statusSolicitacao = '1';
    }
    else if(statusSolicitacao === 'REPROVADA') {
        statusSolicitacao = '2';
    }
    
    else {
        statusSolicitacao = '0';
    }

    const dataSolicitacao = new Date(data).toLocaleString().replace(/,/,'').split(' ')[0];
    return(
        <Dialog open={open} PaperProps={{style: { maxWidth: "950px", maxHeight: "500px" }}}>
            <DialogTitle>
                <Box display={'flex'} marginBottom={2}>
                    <Typography variant="h6">Requisição Nº {solicitacao?.numeroSol}</Typography> 

                </Box>
                <Box display={'flex'} justifyContent={'space-between'} height={1}>
                    <Typography variant="h6">Status: <ButtonStatus statusRequisicao={statusSolicitacao} /></Typography> 
                    <Typography variant="h6">Solicitante: {solicitacao?.solicitante.name}</Typography> 
                    <Typography variant="h6">Data de Emissão: {dataSolicitacao}</Typography> 
                </Box>
            </DialogTitle>
            <DialogContent
                dividers
                sx={{
                    height: heightDialog != null  ? heightDialog : '500px' , 
                    width: '950px',
                    paddingY: 0,
                    paddingX: 0,
                }}
            >
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
            </DialogContent>
            <DialogActions>
                    <Button 
                        onClick={handleClose}
                        variant="contained" 
                        color="error"
                        disableElevation
                    >Cancelar</Button>

                    <Button 
                        onClick={formSubmit}
                        variant="contained" 
                        color="primary"
                        disableElevation
                    >Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};