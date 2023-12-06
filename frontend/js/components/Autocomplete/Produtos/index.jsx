import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import { useDebounce } from '../../../hooks/UseDebounce';
import { useField } from '@unform/core';
import { ProdutoService } from '../../../services/api/produtos/ProdutoService';
export const AutoCompleteProduto = ({ name, isExternalLoading = false, isEdit, isMovimentoEstoque = false, ...rest }) => {
    const { fieldName, registerField, error, clearError, defaultValue } = useField(name);
    const { debounce } = useDebounce();
    const [selectedId, setSelectedId] = useState(defaultValue);
    const [opcoes, setOpcoes] = useState([]);
    const [unidadeMedidaAtual, setUnidadeMedidaAtual] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [busca, setBusca] = useState('');
    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
        });
    }, [registerField, fieldName, selectedId]);
    useEffect(() => {
        setIsLoading(true);
        if (isEdit) {
            ProdutoService.getAll()
                .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                }
                else {
                    setOpcoes(result.map(produto => ({ idProduto: produto.idProduto, label: produto.nome, unidadeMedida: produto.unidadeMedida.sigla })));
                }
            });
        }
        debounce(() => {
            ProdutoService.getAllContaing(0, busca)
                .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                }
                else {
                    setOpcoes(result.content.map(produto => ({ idProduto: produto.idProduto, label: produto.nome, unidadeMedida: produto.unidadeMedida.sigla })));
                }
            });
        });
    }, [busca]);
    const autoCompleteSelectedOption = useMemo(() => {
        //!selectedId é a mesma coisa de selectedId === undefined
        if (!selectedId)
            return null;
        const selectedOption = opcoes.find(opcao => opcao.idProduto === selectedId);
        if (isEdit) {
            setUnidadeMedidaAtual(selectedOption?.unidadeMedida);
        }
        if (!selectedOption)
            return null;
        return selectedOption;
    }, [selectedId, opcoes]);
    return (<Box display="flex">
            <Box flex={2}>
                <Autocomplete openText='Abrir' fullWidth closeText='Fechar' noOptionsText='Sem opções' loadingText='Carregando...' disablePortal options={opcoes} loading={isLoading} disabled={isExternalLoading || isMovimentoEstoque} value={autoCompleteSelectedOption} onInputChange={(_, newValue) => setBusca(newValue)} onChange={(_, newValue) => {
            setSelectedId(newValue?.idProduto);
            clearError();
            setUnidadeMedidaAtual(newValue?.unidadeMedida);
            rest.idProduto?.(newValue?.idProduto);
        }} popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28}/> : undefined} renderInput={(params) => (<TextField {...params} label="Produto" error={!!error} helperText={error} sx={{
                "& input": {
                    border: 'none',
                    margin: 0,
                    padding: 1,
                    paddingY: 0,
                    paddingRight: 0,
                },
                width: '260px',
                marginLeft: 1,
            }}/>)}/>
            </Box>
            <Box paddingLeft={2} flex={1}>
                <TextField disabled variant="outlined" label="Unidade" type="text" value={unidadeMedidaAtual} defaultValue=" " //espaço para que a label não fique no meio da input
     sx={{
            "& input": { border: 'none',
                margin: 2,
                padding: 1,
                paddingY: 0,
                paddingRight: 0
            },
            width: '150px'
        }} fullWidth/>

                </Box>
        </Box>);
};
