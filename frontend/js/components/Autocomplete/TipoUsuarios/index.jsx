import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useField } from '@unform/core';
export const AutoCompleteTipoUsuario = ({ name }) => {
    const opcoesValue = [{ idUsuario: 1, name: 'Usuário' }, { idUsuario: 2, name: 'Administrador' }, { idUsuario: 3, name: "Gerente" }];
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
    const [selectedId, setSelectedId] = useState(defaultValue);
    const [opcoes, setOpcoes] = useState([]);
    const [busca, setBusca] = useState('');
    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
        });
    }, [registerField, fieldName, selectedId]);
    useEffect(() => {
        setOpcoes(opcoesValue.map(opcao => ({ idUsuario: opcao.idUsuario, label: opcao.name })));
    }, [busca]);
    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId)
            return null;
        const selectedOption = opcoes.find(opcao => opcao.idUsuario === selectedId);
        if (!selectedOption)
            return null;
        return selectedOption;
    }, [selectedId, opcoes]);
    return (<Autocomplete onInputChange={(_, newValue) => setBusca(newValue)} onChange={(_, newValue) => { setSelectedId(newValue?.idUsuario); setBusca(''); clearError(); }} options={opcoes} value={autoCompleteSelectedOption} renderInput={(params) => (<TextField {...params} label="Tipo Usuário" error={!!error} helperText={error} sx={{
                "& input": {
                    border: 'none',
                    margin: 0,
                    padding: 1,
                    paddingY: 0,
                    paddingRight: 0
                },
            }}/>)}/>);
};
