import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useDebounce } from '../../../hooks/UseDebounce';
import { useField } from '@unform/core';
import { UnidadeMedidaService } from '../../../services/api/UnidadeMedida/UnidadeMedidaService';
export const AutoCompleteUnidadeMedida = ({ name, isExternalLoading = false, isEdit }) => {
    const { fieldName, registerField, error, clearError, defaultValue } = useField(name);
    const { debounce } = useDebounce();
    const [selectedId, setSelectedId] = useState(defaultValue);
    const [opcoes, setOpcoes] = useState([]);
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
            UnidadeMedidaService.getAll()
                .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                }
                else {
                    setOpcoes(result.map(unidade => ({ idUnidadeMedida: unidade.idUnidadeMedida, label: unidade.unidadeMedida })));
                }
            });
        }
        debounce(() => {
            UnidadeMedidaService.getAllContaing(0, busca)
                .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                }
                else {
                    setOpcoes(result.content.map(unidade => ({ idUnidadeMedida: unidade.idUnidadeMedida, label: unidade.unidadeMedida })));
                }
            });
        });
    }, [busca]);
    const autoCompleteSelectedOption = useMemo(() => {
        //!selectedId é a mesma coisa de selectedId === undefined
        if (!selectedId)
            return null;
        const selectedOption = opcoes.find(opcao => opcao.idUnidadeMedida === selectedId);
        if (!selectedOption)
            return null;
        return selectedOption;
    }, [selectedId, opcoes]);
    return (<Autocomplete openText='Abrir' closeText='Fechar' noOptionsText='Sem opções' loadingText='Carregando...' disablePortal options={opcoes} loading={isLoading} disabled={isExternalLoading} value={autoCompleteSelectedOption} onInputChange={(_, newValue) => setBusca(newValue.toUpperCase())} onChange={(_, newValue) => { setSelectedId(newValue?.idUnidadeMedida); clearError(); }} popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28}/> : undefined} renderInput={(params) => (<TextField {...params} label="Unidade" error={!!error} helperText={error} sx={{
                "& input": {
                    border: 'none',
                    margin: 0,
                    padding: 1,
                    paddingY: 0,
                    paddingRight: 0,
                },
            }}/>)}/>);
};
