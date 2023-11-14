import React, { useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface Iprops {
    statusRequisicao: string;
}

export const ButtonStatus: React.FC<Iprops> = ({ statusRequisicao }) => {

    const[status, setStatus] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
        statusRequisicao = status;
    }

    return(
        <>
            <Select
                size='small'
                sx={{
                    paddingRight: 10
                }}
                value={status || statusRequisicao}
                onChange={handleChange}
            >
                <MenuItem> </MenuItem>
                <MenuItem value={1}>APROVADA</MenuItem>
                <MenuItem value={3}>ABERTA</MenuItem>
                <MenuItem value={2}>REPROVADA</MenuItem>
            </Select>
        </>
    );
};