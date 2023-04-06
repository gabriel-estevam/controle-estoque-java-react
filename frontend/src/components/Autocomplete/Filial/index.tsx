import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useDebounce } from '../../../hooks/UseDebounce';
import { FilialService } from '../../../services/api/filial/FilialService';
import { useField } from '@unform/core';

type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteFilialProps {
    name: string;
    isExternalLoading?: boolean;
}
export const AutoCompleteFilial: React.FC<IAutoCompleteFilialProps> = ({ name ,isExternalLoading = false }) => {
    const { fieldName, registerField, error, clearError, defaultValue } = useField(name);

    const { debounce } = useDebounce();
    
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
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

        debounce(() => {
            FilialService.getAll(0, busca)
            .then((result) => {
                setIsLoading(false);
                if(result instanceof Error) {
                    alert(result.message);
                }
                else {
                    setOpcoes(result.content.map(filial => ({ id: filial.id, label: filial.name })));
                }
            });
        });
    }, [busca]);

    const autoCompleteSelectedOption = useMemo(() => {
        //!selectedId é a mesma coisa de selectedId === undefined
        if (!selectedId) return null; 

        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        if (!selectedOption) return null;

        return selectedOption;
    }, [selectedId, opcoes]);


    return (
        <Autocomplete
            openText='Abrir'
            closeText='Fechar'
            noOptionsText='Sem opções'
            loadingText='Carregando...'
            
            disablePortal
            
            options={opcoes}
            loading={isLoading}
            disabled={isExternalLoading}
            value={autoCompleteSelectedOption}
            onInputChange={(_, newValue) => setBusca(newValue)}
            onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca(''); clearError(); }}
            popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Filial"
                    error={!!error}
                    helperText={error}
                    sx={{
                        "& input": 
                        {
                            border: 'none', 
                            margin: 0, 
                            padding: 1, 
                            paddingY: 0,
                            paddingRight: 0,
                        },
                    }}
                />
            )}
        />
    );
};