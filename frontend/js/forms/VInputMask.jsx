import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useField } from '@unform/core';
import { Mask } from './Masks';
export const VInputMask = ({ name, edit, tipoMask, ...rest }) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
        });
    }, [registerField, fieldName, value]);
    const handleKeyUp = (e) => {
        if (tipoMask === "CEP") {
            let valueMask;
            valueMask = Mask.cep(e);
            setValue(valueMask);
        }
        if (tipoMask === "CNPJ") {
            let valueMask;
            valueMask = Mask.cnpj(e);
            setValue(valueMask);
        }
        if (tipoMask === "TELEFONE") {
            let valueMask;
            valueMask = Mask.telefoneFixo(e);
            setValue(valueMask);
        }
    };
    return (<TextField {...rest} error={!!error} helperText={error} value={value || ''} onChange={e => { setValue(e.target.value); handleKeyUp(e); }} onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e); }}/>);
};
