import React, { ReactNode } from 'react';
import { Box } from '@mui/system';
import { Divider, Icon, IconButton,Paper,Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDrawerContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';

interface ILayoutBasePaginaProps {
    barraFerramentas?: ReactNode;
    children: ReactNode;
    titulo: string;
    subTitulo?: string;
    renderTabela: boolean;
    totalElements?: number;
};

export const LayoutBasePagina: React.FC<ILayoutBasePaginaProps> = 
({ children, 
    titulo, 
    subTitulo, 
    barraFerramentas, 
    renderTabela, 
    totalElements
}) => {
    const navigate = useNavigate();
    const logout = () => { localStorage.removeItem("token"); navigate("/"); };

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    //const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const { toggleDrawerOpen } = useDrawerContext();
    
    return (
        <Box 
            height="100%"
            display="flex"
            flexDirection="column"
            gap={1}
        >
            <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="flex-start"
                height={theme.spacing(8)}
                paddingLeft={!smDown ? 1 : 0}
                width="100%">
                { smDown && 
                    (
                        <IconButton onClick={ toggleDrawerOpen }>
                            <Icon><MenuIcon/></Icon>
                        </IconButton>
                    )
                }
                <Typography
                    //overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipses"
                    //variant={smDown ? 'h6' : mdDown ? 'h4' : 'h3'}
                    variant='h4'
                    marginLeft="25px"
                >
                    {titulo}
                </Typography>
                <Box flex={1} display="flex" justifyContent="end">
                    <IconButton  
                        sx={{
                            color: 'black',
                        }} 
                        onClick={ logout }
                    >
                        <Icon>
                            <LogoutIcon/>
                        </Icon>
                        <Typography marginTop="5px" marginLeft="3px">Sair</Typography>
                    </IconButton>
                </Box>
            </Box>

           
            {renderTabela && (
                <Box 
                    flex={1} 
                    overflow="auto"
                    height="100%"
                    marginX={1}
                    component={Paper}
                >
                    <Box 
                        marginX={1}
                        paddingX={2}
                    flex={1}
                    >
                        {barraFerramentas && (
                            barraFerramentas
                        )}

                    </Box>
                    <Box
                        component={Paper}
                        marginX={3}
                        marginTop={2}
                        padding={2}
                        flex={1}
                        //height="70%"
                        height={`${totalElements}%`}
                        //overflow="auto"
                    >
                        <Typography variant="subtitle1" fontWeight="bold">
                            {subTitulo}
                        </Typography>
                        <Divider/>
                        <Box 
                            height="20%"
                            marginTop={3}
                        >
                            {children}
                        </Box>
                    </Box>

                </Box>
            )}
                
        </Box>
    );
};