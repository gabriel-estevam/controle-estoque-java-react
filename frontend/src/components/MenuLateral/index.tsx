import React, {ReactNode, useState } from 'react';
import { 
    Drawer, 
    Divider, 
    useTheme, 
    List, 
    ListItemButton, 
    ListItemText, 
    Icon, 
    ListItemIcon, 
    Typography, 
    Collapse, 
    useMediaQuery
} from '@mui/material';
import { Box } from '@mui/system';
import { FaListAlt } from 'react-icons/fa';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';
//tipagem da propriedade children, com isso conseguimos pegar os children dentro desse componente
//sem essa tipagem o TypeScript não reconhece que o menuLateral pode pegar childrens
type Props = {
    children: ReactNode
};

interface IListItemLinkProps {
    to: string;
    icon: ReactNode;
    label: string;
    onClick: (() => void) | undefined;
};

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });
    
    const handleClick = () => {
        navigate(to);
        onClick?.();
      };

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>
                    {icon}
                </Icon>
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>
    );
}

const NestedListSubheader: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {

    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });
    
    const handleClick = () => {
        navigate(to);
        onClick?.();
      };

    return (
        <ListItemButton sx={{pl: 2,  }} selected={!!match}  onClick={handleClick}>
            <ListItemIcon>
                <Icon>
                    {icon}
                </Icon>
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>        
    );
}

const NestedListHeader: React.FC<Props> = ({ children })  => {
    const [open, setOpen] = useState(false);
    
    const handleClickOpenList = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItemButton onClick={handleClickOpenList}>
                <ListItemIcon>
                    <Icon>
                        <FaListAlt color="#b7b9bb" />
                    </Icon>
                </ListItemIcon>
                <ListItemText primary="Cadastros" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    { children }
                </List>
            </Collapse>
        </>
    );
};

export const MenuLateral: React.FC<Props> = ({ children }) => {
//referenciado o Props nessa função para pegar os childrens de dentro desse componente

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions, drawerOptionsNestedList } = useDrawerContext();

    return (
        <>
            <Drawer open={isDrawerOpen} 
                    variant={ smDown ? 'temporary' : 'permanent' } 
                    onClose={toggleDrawerOpen} >
                <Box width={theme.spacing(28)} 
                     display="flex" 
                     flexDirection="column" 
                     bgcolor="#343a40" 
                     height="100%" >
                    <Box display="flex" 
                         alignItems="center" 
                         justifyContent="flex-start" 
                         height={theme.spacing(8)} 
                         width="100%" >
                        <Typography variant="h6" 
                                    marginLeft="10px" 
                                    color="#b7b9bb" 
                                    width="100%" >Controle de Estoque</Typography>
                    </Box>

                    <Divider/>
                    
                    <Box display="flex"
                         alignItems="center"
                         width="100%"
                         height="30px"
                         marginBottom="10px">
                        <Typography variant="h6" 
                                    align="justify" 
                                    fontSize="12pt" 
                                    marginTop="5px" 
                                    marginLeft="10px"
                                    color="#b7b9bb" >
                            Nome Do usuario
                        </Typography>
                    </Box>
                    
                    <Box display="flex"
                         alignItems="center"
                         width="100%"
                         height="5px"
                         marginBottom="10px">
                         <Typography variant="h6" 
                                     align="justify" 
                                     fontSize="12pt" 
                                     marginTop="5px"
                                     marginBottom="8px"
                                     marginLeft="10px"
                                     color="#b7b9bb" >
                            Nome da Filial
                        </Typography>
                    
                    </Box>
                    
                    <Divider/>
                    
                    <Box flex={1}>
                        <List 
                         sx={{ width: '100%', 
                               maxWidth: 360, 
                               bgcolor: '#343a40', 
                               color: '#b7b9bb' 
                            }}
                         component="nav"
                         aria-labelledby="nested-list-subheader"
                        >
                           {drawerOptions.map(drawerOption => (
                                <ListItemLink
                                     to={drawerOption.path}
                                     key={drawerOption.path}
                                     icon={drawerOption.icon}
                                     label={drawerOption.label}
                                     onClick={smDown ? toggleDrawerOpen : undefined}
                                ></ListItemLink>
                            ))}

                            {
                                <NestedListHeader>
                                    {
                                        drawerOptionsNestedList.map(drawerOptionsNestedList => (
                                            <NestedListSubheader 
                                                to={drawerOptionsNestedList.path}
                                                key={drawerOptionsNestedList.path}
                                                icon={drawerOptionsNestedList.icon}
                                                label={drawerOptionsNestedList.label}
                                                onClick={smDown ? toggleDrawerOpen : undefined}
                                            />
                                        ))
                                    }
                                </NestedListHeader>
                            }
                        </List>

                    </Box>
                </Box>

            </Drawer>
            
            <Box height="100vh" marginLeft={ smDown ? 0 : theme.spacing(28) }>
                { children }
            </Box>
        </>
    )
}