import { TableCell } from '@mui/material';
import React, { useState } from 'react';
import { ProdutoService } from '../../../../../services/api/produtos/ProdutoService';
export const ItemSolicitacao = ({ item, buttonRm }) => {
    const [produto, setProduto] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('');
    //@ts-ignore
    ProdutoService.getById(item.produtoFK)
        .then((result) => {
        if (result instanceof Error) {
            alert(result.message);
        }
        else {
            setProduto(result.nome);
            setUnidadeMedida(result.unidadeMedida?.sigla);
        }
    });
    return (<>
            <TableCell>{produto}</TableCell>
            <TableCell>{unidadeMedida}</TableCell>
            <TableCell>{item.quantidade}</TableCell>
            <TableCell>{item.observacao}</TableCell>
            <TableCell>
                {buttonRm}
            </TableCell>
        </>);
};
