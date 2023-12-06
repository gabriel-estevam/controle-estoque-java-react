import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useField } from '@unform/core';
export const VDateTimeField = ({ name, ...rest }) => {
    const { fieldName, registerField } = useField(name);
    const [dateState, setDateState] = useState(new Date());
    function startTimer() { setTimeout(() => setDateState(new Date()), 60); }
    useEffect(() => {
        startTimer();
    }, [dateState]);
    const dataHoraCompleta = dateState;
    const dataHora = dataHoraCompleta.toLocaleString();
    const splitData = dataHora.split(',');
    const dataHoraEntrada = `${splitData[0]} ${splitData[1]}`;
    const [value, setValue] = useState(dateState);
    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => dateState,
            setValue: (_, newValue) => setValue(newValue),
        });
    }, [registerField, fieldName, dataHoraEntrada, value]);
    return (<TextField {...rest} value={dataHoraEntrada}/>);
};
