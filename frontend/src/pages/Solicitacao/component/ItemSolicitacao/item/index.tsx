import { TableCell } from '@mui/material';
import React, { useState } from 'react';
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
    buttonRm: any
}

export const ItemSolicitacao: React.FC<Props> = ({ item, buttonRm }) => {
    const [produto, setProduto] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState<string | undefined>('');

    //@ts-ignore
    ProdutoService.getById(item.produtoFK)
    .then((result) => {
        if(result instanceof Error) {
            alert(result.message);
        }
        else {
            setProduto(result.nome);
            setUnidadeMedida(result.unidadeMedida?.sigla);
        }
    });

    return(
        <>
            <TableCell>{produto}</TableCell>
            <TableCell>{unidadeMedida}</TableCell>
            <TableCell>{item.quantidade}</TableCell>
            <TableCell>{item.observacao}</TableCell>
            <TableCell>
                { buttonRm }
            </TableCell>
        </>
    );
}