import React from 'react';
import { Box, Button, InputAdornment, Paper, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Environment } from '../../environment/index';
export const BarraFerramentas = ({ textoDaBusca = '', aoMudarTextoDeBusca, mostrarInputBusca = false, aoClicarEmNovo, textoBotaoNovo = 'Novo', mostrarBotaoNovo = true, }) => {
    // const theme = useTheme();
    return (<Box gap={1} padding={1} width="100%" 
    // marginBottom={theme.spacing(100)}
    marginY={1} paddingX={2} display="flex" alignItems="center" 
    //height={theme.spacing(5)}
    component={Paper}>
                {mostrarInputBusca && (<TextField size="small" type="search" placeholder={Environment.INPUT_DE_BUSCA} value={textoDaBusca} onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start">
                                <SearchIcon />                      
                            </InputAdornment>) }}/>)}
                <Box flex={1} display="flex" justifyContent="end">
                    {mostrarBotaoNovo && (<Button variant="contained" color="primary" disableElevation onClick={aoClicarEmNovo} startIcon={<AddIcon />}>{textoBotaoNovo}</Button>)}
                </Box>

            </Box>);
};
