import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';
import { useDebounce } from '../../../hooks/UseDebounce';
import { UsuarioService } from '../../../services/api/usuarios/UsuarioService';

type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteUsuarioProps {
    name: string;
    isExternalLoading?: boolean;
}

export const AutoCompleteUsuario: React.FC<IAutoCompleteUsuarioProps> = ({ name ,isExternalLoading = false }) => {
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
            UsuarioService.getAll(0, busca)
            .then((result) => {
                setIsLoading(false);
                if(result instanceof Error) {
                    alert(result.message);
                }
                else {
                    setOpcoes(result.content.map(usuario => ({ id: usuario.id, label: usuario.name })));
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
                    label="Usuário"
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