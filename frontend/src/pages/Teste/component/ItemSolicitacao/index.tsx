import React, { useState } from 'react';
import { AddCircleRounded } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { AutoCompleteProduto } from '../../../../components';
import { VTextField } from '../../../../forms';

type Props = {
    addItem: any;
}
interface IListagemItens {
    produtoFK: number;
    produto: string ;
    unidadeMedida: string;
    quantidade: number;
    observacao: string; 
}

export const FormSolicitacao: React.FC<Props> = ({ addItem }) => {
    const [value, setValue] = useState<IListagemItens | any>();

    const handleOnChange = (targetValue: any, input: number) => {
        switch (input) 
        {
            case 1:
                var unidade;
                var id;
                if(typeof targetValue === "string") {
                    unidade = targetValue;
                } else if(typeof targetValue === "number"){
                    id = targetValue;
                } else { return; }
                setValue({
                    produtoFK: id,
                    unidadeMedida: unidade,
                    quantidade: value?.quantidade,
                    observacao: value?.observacao,
                });
                console.log(id)
            break;

            case 2:
                setValue({
                    quantidade: Number(targetValue), 
                    observacao: value?.observacao,
                    produtoFK: value?.produtoFK,
                    unidadeMedida: value?.unidadeMedida,
                });
            break;

            case 3:
                setValue({
                    observacao: targetValue,
                    quantidade: value?.quantidade,
                    produtoFK: value?.produtoFK,
                    unidadeMedida: value?.unidadeMedida,
                });
            break;
            
            default:
                console.error('Invalid code!');
            break;
        }

    }
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
                    idProduto={ (e) => handleOnChange(e, 1) }
                    unidade={   (e) => handleOnChange(e, 1) }
                />
            </Grid>

            <Grid item md={2}>
                <VTextField 
                    name="itensSolicitacao[0].quantidade"
                    label="Qtde" 
                    variant="outlined"
                    type="number"
                    onChange={(e) => handleOnChange(e.target.value, 2)}
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
                    onChange={(e) => handleOnChange(e.target.value, 3)}
                />
            </Grid>
            <Grid item md={1}>
                <IconButton onClick={() => createItem(value)}>
                    <AddCircleRounded
                        //color='primary'
                        fontSize='large'
                    />
                </IconButton>
            </Grid>
        </>
    );
};