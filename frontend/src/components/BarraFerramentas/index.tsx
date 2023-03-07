import React from 'react';
import { Box, Button, InputAdornment, Paper, TextField, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Environment } from '../../environment/index';

interface IBarraDeFerramentasProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const BarraFerramentas: React.FC<IBarraDeFerramentasProps> = ({
    textoDaBusca = '',
    aoMudarTextoDeBusca,
    mostrarInputBusca = false,
    aoClicarEmNovo,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
}) => {
    const theme = useTheme();
    return (
        <Box 
            gap={1} 
            marginX={1}
            padding={4}
            paddingX={2}
            display="flex"
            alignItems="center"
            height={theme.spacing(5)}
            component={Paper}
        >
           {mostrarInputBusca && (
                 <TextField 
                 size="small" 
                 type="search" 
                 placeholder={Environment.INPUT_DE_BUSCA}
                 value={textoDaBusca}
                 onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                 InputProps={{startAdornment: (
                     <InputAdornment position="start">
                         <SearchIcon />                      
                     </InputAdornment>
                 )}}
             />
           )}
            <Box flex={1} display="flex" justifyContent="end">
               {mostrarBotaoNovo && ( 
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={aoClicarEmNovo}
                        endIcon={<AddIcon />}
                    >{textoBotaoNovo}</Button>
                )}
            </Box>
        </Box>
    );
};