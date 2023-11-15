import { useEffect, useMemo, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useField } from "@unform/core";

type TAutoCompleteOption = {
    id: number;
    label: string;
};

interface IAutoCompleteStatusProps {
    name: string;
};

export const AutoCompleteStatus: React.FC<IAutoCompleteStatusProps> = ({ name }) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
    
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue || '');
    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);

    const opc = [
        { id:3, label: 'ABERTA' },
        { id:1, label: 'APROVADA' },
        { id:2, label: 'REPROVADA' },

    ];

    useEffect(() => {
        registerField({
          name: fieldName,
          getValue: () => selectedId,
          setValue: (_, newValue) => setSelectedId(newValue),
        });
    }, [registerField, fieldName, selectedId]);

    useEffect(() => {
        setOpcoes(opc.map(opcao => ({ id: opcao.id, label: opcao.label })));
    }, []);

    const autoCompleteSelectedOption = useMemo(() => {
        //!selectedId é a mesma coisa de selectedId === undefined
        if (!selectedId) return null; 

        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        if (!selectedOption) return null;

        return selectedOption;
    }, [selectedId, opcoes]);

    return (
        <Autocomplete
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Sem opções"
            loadingText="Carregando..."

            disablePortal
            options={opcoes}
            value={autoCompleteSelectedOption}
            onChange={(_, newValue) => { setSelectedId(newValue?.id); clearError(); }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Status"
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
}