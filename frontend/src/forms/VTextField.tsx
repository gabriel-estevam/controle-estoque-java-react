import React, { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

type TVTextField = TextFieldProps & {
    name: string,
    edit?: boolean,
};

export const VTextField: React.FC<TVTextField> = ({edit, name, ...rest}) => {
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
          //  defaultValue={!edit ? defaultValue : undefined}
            value={value || ''}
            onChange={e => { setValue(e.target.value); rest.onChange?.(e); }}
            onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e); }}
        />
    );
};