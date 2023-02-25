import React, { ReactNode } from 'react';
import { Box } from '@mui/system';
import { Icon, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../../contexts';

interface ILayoutBasePaginaProps {
    children: ReactNode;
    titulo: string;
};

export const LayoutBasePagina: React.FC<ILayoutBasePaginaProps> = ({ children, titulo }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

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
                <Typography variant="h6">
                    {titulo}
                </Typography>
            </Box>

            <Box>
                {children}
            </Box>
        </Box>
    );
};