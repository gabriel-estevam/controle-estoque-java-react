import React, { useState } from 'react';
import { AddCircleRounded } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { AutoCompleteProduto } from '../../../../components';
import { VTextField } from '../../../../forms';

type Props = {
    addItem: any;
};

interface IListagemItens {
    produtoFK: number;
    quantidade: number;
    observacao: string; 
};

export const FormSolicitacao: React.FC<Props> = ({ addItem }) => {
    const [value, setValue] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [obs, setObs] = useState('');

    const handleOnChangeProduto = (targetValue: any) => {
        setValue(targetValue);
    };
    
    const handleOnChangeQtde = (targetValue: any) => {
        setQuantidade(targetValue);
    };
    
    const handleOnChangeObs = (targetValue: any) => {
        setObs(targetValue);
    };
    
    const createItem = (objeto: IListagemItens) => {
        const objItem = objeto;
        addItem(objItem);
    }

    return (
        <>
            <Grid item md={6}>
                <AutoCompleteProduto 
                    name="itensSolicitacao[0].produtoFK" 
                    //isExternalLoading={isLoading} 
                    isEdit={false} 
                    idProduto={ (e) => handleOnChangeProduto(e) }
                />
            </Grid>

            <Grid item md={2}>
                <VTextField 
                    name="itensSolicitacao[0].quantidade"
                    label="Qtde" 
                    variant="outlined"
                    type="number"
                    onChange={(e) => handleOnChangeQtde(e.target.value)}
                />
            </Grid>
            <Grid item md={3}>
                <VTextField
                    name="itensSolicitacao[0].observacao"
                    label="Observação" 
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
                    onChange={(e) => handleOnChangeObs(e.target.value)}
                />
            </Grid>
            <Grid item md={1}>
                <IconButton onClick={() => createItem({
                    produtoFK: value,
                    quantidade: quantidade,
                    observacao: obs,
                })}>
                    <AddCircleRounded
                        fontSize='large'
                    />
                </IconButton>
            </Grid>
        </>
    );
};