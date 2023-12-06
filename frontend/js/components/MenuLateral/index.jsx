import React, { useState } from 'react';
import { Drawer, Divider, useTheme, List, ListItemButton, ListItemText, Icon, ListItemIcon, Typography, Collapse, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { FaListAlt, FaChartPie } from 'react-icons/fa';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';
import { DecodeTokenJWT } from '../../services/api/auth/decode/DecodeTokenJWT';
;
const ListItemLink = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });
    const handleClick = () => {
        navigate(to);
        onClick?.();
    };
    return (<ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>
                    {icon}
                </Icon>
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>);
};
const NestedListSubheader = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });
    const handleClick = () => {
        navigate(to);
        onClick?.();
    };
    return (<ListItemButton sx={{ pl: 2, }} selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>
                    {icon}
                </Icon>
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>);
};
const NestedListHeader = ({ children }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpenList = () => {
        setOpen(!open);
    };
    return (<>
            <ListItemButton onClick={handleClickOpenList}>
                <ListItemIcon>
                    <Icon>
                        <FaListAlt color="#b7b9bb"/>
                    </Icon>
                </ListItemIcon>
                <ListItemText primary="Cadastros"/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children}
                </List>
            </Collapse>
        </>);
};
const ReportsNestedListHeader = ({ children }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpenList = () => {
        setOpen(!open);
    };
    return (<>
            <ListItemButton onClick={handleClickOpenList}>
                <ListItemIcon>
                    <Icon>
                        <FaChartPie color="#b7b9bb"/>
                    </Icon>
                </ListItemIcon>
                <ListItemText primary="Relatórios"/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children}
                </List>
            </Collapse>
        </>);
};
export const MenuLateral = ({ children }) => {
    //referenciado o Props nessa função para pegar os childrens de dentro desse componente
    //@ts-ignore
    const usuarioToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario;
    //@ts-ignore
    const filialToken = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario.filialName;
    //@ts-ignore
    const role = DecodeTokenJWT.decodeTokenJWT(localStorage.getItem("token")).usuario.role;
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { isDrawerOpen, toggleDrawerOpen, drawerOptions, drawerOptionsNestedList, drawerOptionsNestedListReports } = useDrawerContext();
    return (<>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(30)} display="flex" flexDirection="column" bgcolor="#343a40" height="100%">
                    <Box display="flex" alignItems="center" justifyContent="flex-start" height={theme.spacing(8)} width="100%">
                        <Typography variant="h6" marginLeft="10px" color="#b7b9bb" width="100%">Controle de Estoque</Typography>
                    </Box>

                    <Divider />
                    
                    <Box display="flex" alignItems="center" width="100%" height="30px" marginBottom="10px">
                        <Typography variant="h6" align="justify" fontSize="12pt" marginTop="5px" marginLeft="10px" color="#b7b9bb">
                            Olá, {usuarioToken.name}
                        </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" width="100%" height="5px" marginBottom="10px">
                         <Typography variant="h6" align="justify" fontSize="12pt" marginTop="5px" marginBottom="8px" marginLeft="10px" color="#b7b9bb">
                            Filial: {filialToken}
                        </Typography>
                    
                    </Box>
                    
                    <Divider />
                    
                    <Box flex={1}>
                        <List sx={{ width: '100%',
            maxWidth: 360,
            bgcolor: '#343a40',
            color: '#b7b9bb'
        }} component="nav" aria-labelledby="nested-list-subheader">
                           {drawerOptions.map(function (item) {
            if (item.label === "Home") {
                return <ListItemLink to={item.path} key={item.path} icon={item.icon} label={item.label} onClick={smDown ? toggleDrawerOpen : undefined}></ListItemLink>;
            }
            if (item.label === "Recebimento") {
                return <ListItemLink to={item.path} key={item.path} icon={item.icon} label={item.label} onClick={smDown ? toggleDrawerOpen : undefined}></ListItemLink>;
            }
            if ((role.toString() === 'ADMIN') || (role.toString() === 'MANAGERS')) {
                if ((item.label === 'Estoque Materiais') ||
                    (item.label === 'Consultar Movimentação de Estoque') ||
                    (item.label === 'Compras' && role.toString() === 'MANAGERS') ||
                    (item.label === 'Movimentação de Estoque' && role.toString() === 'ADMIN')) {
                    return <ListItemLink to={item.path} key={item.path} icon={item.icon} label={item.label} onClick={smDown ? toggleDrawerOpen : undefined}></ListItemLink>;
                }
                if (item.label === 'Requisição de Materiais' && role.toString() === 'ADMIN') {
                    return <ListItemLink to={item.path} key={item.path} icon={item.icon} label={item.label} onClick={smDown ? toggleDrawerOpen : undefined}></ListItemLink>;
                }
            }
            else {
                if ((item.label === "Consultar Movimentação de Estoque") ||
                    (item.label === "Movimentação de Estoque") ||
                    (item.label === "Requisição de Materiais")) {
                    return <ListItemLink to={item.path} key={item.path} icon={item.icon} label={item.label} onClick={smDown ? toggleDrawerOpen : undefined}></ListItemLink>;
                }
            }
        })}

                            {((role.toString() === "ADMIN") || (role.toString() === "MANAGERS")) && (<NestedListHeader>
                                        {drawerOptionsNestedList.map(function (item) {
                if (item.label === "Usuários" && role.toString() === "ADMIN") {
                    return <NestedListSubheader to={item.path} key={item.path} icon={item.icon} label={item.label} onClick={smDown ? toggleDrawerOpen : undefined}/>;
                }
                if ((item.label !== "Usuários" && item.label !== "Filiais") && (role.toString() !== "ADMIN")) {
                    return <NestedListSubheader to={item.path} key={item.path} icon={item.icon} label={item.label} onClick={smDown ? toggleDrawerOpen : undefined}/>;
                }
                if (role.toString() === "ADMIN") {
                    if (item.label !== "Produtos" && item.label !== "Fornecedores") {
                        return <NestedListSubheader to={item.path} key={item.path} icon={item.icon} label={item.label} onClick={smDown ? toggleDrawerOpen : undefined}/>;
                    }
                }
            })}
                                    </NestedListHeader>)}

                            {
        //(role.toString() === "MANAGERS") && (
        ((role.toString() === "ADMIN") || (role.toString() === "MANAGERS")) && (<ReportsNestedListHeader>
                                        {drawerOptionsNestedListReports.map(function (item) {
                return <NestedListSubheader to={item.path} key={item.path} icon={item.icon} label={item.label} onClick={smDown ? toggleDrawerOpen : undefined}/>;
            })}
                                    </ReportsNestedListHeader>)}
                        </List>

                    </Box>
                </Box>

            </Drawer>
            
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>);
};
