import React, { ReactNode } from 'react';
import { Box } from '@mui/system';
import { Icon, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDrawerContext } from '../../contexts';

interface ILayoutBasePaginaProps {
    children: ReactNode;
    titulo: string;
};

export const LayoutBasePagina: React.FC<ILayoutBasePaginaProps> = ({ children, titulo }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const { toggleDrawerOpen } = useDrawerContext();
    
    return (
        <Box height="100%"
             display="flex"
             flexDirection="column"
             gap={1}
        >
            <Box display="flex" 
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
          variant={smDown ? 'h6' : mdDown ? 'h4' : 'h3'}
        >
                    {titulo}
                </Typography>
                <Box sx={{
                        marginLeft: smDown ? "50%" : mdDown ? "50%" : "80%",
                        height: theme.spacing(6)
                    }
                    }>
                    <IconButton sx={{
                        color: 'black',
                    }
                    }>
                        <Icon>
                            <LogoutIcon/>
                        </Icon>
                        <Typography marginTop="5px" marginLeft="3px">
                                Sair
                            </Typography>
                    </IconButton>
                </Box>
            </Box>

            <Box>
                {children}
            </Box>
        </Box>
    );
};