import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useDebounce } from '../../../hooks/UseDebounce';
import { useField } from '@unform/core';
import { FornecedorService } from '../../../services/api/fornecedores/FornecedorService';

type TAutoCompleteOption = {
    idFornecedor: number | null | undefined;
    label: string;
}

interface IAutoCompleteFornecedorProps {
    name: string;
    isExternalLoading?: boolean;
    isEdit: boolean;
    isMovimentoEstoque?: boolean;
}
export const AutoCompleteFornecedor: React.FC<IAutoCompleteFornecedorProps> = ({ name , isExternalLoading = false, isMovimentoEstoque = false, isEdit }) => {
    const { fieldName, registerField, error, clearError, defaultValue } = useField(name);

    const { debounce } = useDebounce();
    
    const [selectedId, setSelectedId] = useState<number | undefined | null>(defaultValue);

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
        
        if(isEdit) {
            FornecedorService.getAll()
            .then((result) => {
                setIsLoading(false);
                if(result instanceof Error) {
                    alert(result.message);
                }
                else {
                    setOpcoes(result.map(fornecedor => ({idFornecedor: fornecedor.idFornecedor, label: fornecedor.name})));
                }
            });
        }

        debounce(() => {
            FornecedorService.getAllContaing(0, busca)
            .then((result) => {
                setIsLoading(false);
                if(result instanceof Error) {
                    alert(result.message);
                }
                else {
                    setOpcoes(result.content.map(fornecedor => ({ idFornecedor: fornecedor.idFornecedor, label: fornecedor.name })));
                }
            });
        });
    }, [busca]);

    const autoCompleteSelectedOption = useMemo(() => {
        //!selectedId é a mesma coisa de selectedId === undefined
        if (!selectedId) return null; 

        const selectedOption = opcoes.find(opcao => opcao.idFornecedor === selectedId);

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
            disabled={isExternalLoading || isMovimentoEstoque}
            value={autoCompleteSelectedOption}
            onInputChange={(_, newValue) => setBusca(newValue)}
            onChange={(_, newValue) => { setSelectedId(newValue?.idFornecedor); clearError(); }}
            popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Fornecedor"
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