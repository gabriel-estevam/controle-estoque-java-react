import { Box, FilledTextFieldProps, OutlinedTextFieldProps, Paper, TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import React, { useEffect, useState } from 'react';

type TVTextField = TextFieldProps & {
    name: string
};

export const VTextField: React.FC<TVTextField> = ({ name, ...rest}) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

    const [value, setValue] = useState(defaultValue || '');

    useEffect(()=> {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
        });
    }, [registerField, fieldName, value]);

    return (
        <TextField
            {...rest}
            error={!!error}
            helperText={error}
            defaultValue={defaultValue}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={() => error ? clearError() : undefined}
        />
    );
};