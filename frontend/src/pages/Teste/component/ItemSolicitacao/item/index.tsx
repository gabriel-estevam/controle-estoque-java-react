import { TableCell } from '@mui/material';
import React from 'react';
import { ProdutoService } from '../../../../../services/api/produtos/ProdutoService';

interface IListagemItens {
    produtoFK?: number;
    produto?: string ;
    unidadeMedida?: string;
    quantidade?: number;
    observacao?: string; 
}
type Props = {
    item: IListagemItens;
}

export const ItemSolicitacao: React.FC<Props> = ({ item }) => {       
    //@ts-ignore
    ProdutoService.getById(item.produtoFK)
    .then((result) => {
        if(result instanceof Error) {
            alert(result.message);
        }
        else {
            item.produto = result.nome;
        }
    });

    return(
        <>
            <TableCell>{item.produto}</TableCell>
            <TableCell>{item.unidadeMedida}</TableCell>
            <TableCell>{item.quantidade}</TableCell>
            <TableCell>{item.observacao}</TableCell>
        </>
    );
}