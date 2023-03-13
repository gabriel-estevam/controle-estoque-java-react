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
};

export const LayoutBasePagina: React.FC<ILayoutBasePaginaProps> = ({ children, titulo, subTitulo, barraFerramentas }) => {
    const navigate = useNavigate();
    const logout = () => { localStorage.removeItem("token"); navigate("/"); };

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const { toggleDrawerOpen } = useDrawerContext();
    
    return (
        <Box 
            height="100%"
            display="flex"
            flexDirection="column"
            gap={1}
        >
            <Box display="flex" 
                 alignItems="center" 
                 justifyContent="flex-start"
                 height={theme.spacing(8)}
                 paddingLeft={!smDown ? 1 : 0}
                 width="100%"
            >
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
                    variant={smDown ? 'h6' : mdDown ? 'h4' : 'h3'}
                    marginLeft="2px"
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

           
           <Box flex={1} 
                //overflow="auto"
            >
                <Box 
                    //gap={1} 
                    marginX={1}
                    overflow="auto"
                    //padding={4}
                    paddingX={2}
                   // display="flex"
                    alignItems="center"
                    height="100%"
                    //height={theme.spacing(5)}
                    component={Paper}
                >
                    {barraFerramentas && (
                        barraFerramentas
                    )}
                    <Box
                        //marginX={1}
                        marginY={2}
                        component={Paper}
                        padding={2}
                        flex={1}
                        height="89%"
                        width="100%"
                        //overflow="auto"
                    >
                        <Typography >
                            {subTitulo}
                        </Typography>
                        <Divider/>

                    {children}
                    </Box>

                </Box>
            </Box>
                
        </Box>
    );
};