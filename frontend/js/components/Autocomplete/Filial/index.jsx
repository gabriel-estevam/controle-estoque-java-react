import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useDebounce } from '../../../hooks/UseDebounce';
import { FilialService } from '../../../services/api/filial/FilialService';
import { useField } from '@unform/core';
export const AutoCompleteFilial = ({ name, isExternalLoading = false, isEdit }) => {
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
            FilialService.getAll()
                .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                }
                else {
                    setOpcoes(result.map(filial => ({ id: filial.idFilial, label: filial.name })));
                }
            });
        }
        debounce(() => {
            FilialService.getAllContaing(0, busca)
                .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                }
                else {
                    setOpcoes(result.content.map(filial => ({ id: filial.idFilial, label: filial.name })));
                }
            });
        });
    }, [busca]);
    const autoCompleteSelectedOption = useMemo(() => {
        //!selectedId é a mesma coisa de selectedId === undefined
        if (!selectedId)
            return null;
        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        if (!selectedOption)
            return null;
        return selectedOption;
    }, [selectedId, opcoes]);
    return (<Autocomplete openText='Abrir' closeText='Fechar' noOptionsText='Sem opções' loadingText='Carregando...' disablePortal options={opcoes} loading={isLoading} disabled={isExternalLoading} value={autoCompleteSelectedOption} onInputChange={(_, newValue) => setBusca(newValue)} onChange={(_, newValue) => { setSelectedId(newValue?.id); clearError(); }} popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28}/> : undefined} renderInput={(params) => (<TextField {...params} label="Filial" error={!!error} helperText={error} sx={{
                "& input": {
                    border: 'none',
                    margin: 0,
                    padding: 1,
                    paddingY: 0,
                    paddingRight: 0,
                },
            }}/>)}/>);
};
