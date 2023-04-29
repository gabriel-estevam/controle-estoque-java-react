import React, { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { FormHandles, useField } from '@unform/core';
import { PublicService } from '../services/api/public/PublicService';

type TVTextField = TextFieldProps & {
    name: string,
    edit?: boolean,
    form: FormHandles | null | undefined,
};


export const VInputMask: React.FC<TVTextField> = ({name, edit, form, ...rest}) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

    const [value, setValue] = useState(defaultValue);
    const [erro, setErro] = useState(false);

    useEffect(()=> {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
        });
    }, [registerField, fieldName, value]);

    const handleKeyUp = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.maxLength = 9;
        let value : string;
        value = e.currentTarget.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        setValue(value);
    }

    const consultaCEP = () => {
        PublicService.searchCEP(value)
        .then((result) => {
            if(result instanceof Error) {
                setErro(true);
            }
            else {
                //@ts-ignore
                form.setData({
                    cep: value,
                    endereco : result.street,
                    cidade: result.city,
                    estado: result.state,
                })
                setErro(false);
            }
        });
    };

    return (
        <TextField
            {...rest}
            error={erro}
            helperText={erro ? "CEP Inválido" : ""}
            value={value || ''}
            onChange={e => { setValue(e.target.value); handleKeyUp(e); /*rest.onChange?.(e);*/ }}
            onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e); }}
            onBlur={(_) => consultaCEP()}
        />
    );
};