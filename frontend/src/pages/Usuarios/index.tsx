import React, { useEffect, useMemo, useState } from 'react';
import { LayoutBasePagina } from '../layouts';
import { BarraFerramentas } from '../../components/BarraFerramentas';
import { useSearchParams } from 'react-router-dom';
import { IListagemUsuario, UsuarioService } from '../../services/api/usuarios/UsuarioService';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Box, Button, useTheme } from '@mui/material';

export const Usuarios: React.FC = () => {
    const theme = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();

    const [rows, setRows] = useState<IListagemUsuario[]>([]);
    const [isLoading, setIsLoading] = useState(true); //verificar se foi carregado os dados no backend
    
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    },[searchParams]);

    useEffect(() => {
        setIsLoading(true);

        UsuarioService.getAll(0, busca)
        .then((result) => {
            setIsLoading(false);

            if(result instanceof Error) {
                alert(result.message);
            }
            else {
              console.log(result.content);
              console.log(result.totalElements);
              setRows(result.content);
            }
        });
    }, [busca]);

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Usuário',
            width: 300,
            editable: false,
             
        },
        {
            field: 'email',
            headerName: 'Login',
            width: 300,
            editable: false,
        },
        {
            field: 'role',
            headerName: 'Tipo Usuário',
            width: 300,
            editable: false,
        },
        {
            field: 'status',
            headerName: 'Status Usuário',
            width: 300,
            editable: false,
        },
        {
            field: 'filialId',
            headerName: 'Filial',
            width: 150,
            editable: false,
        },
        { 
            field: 'acoes', 
            headerName: 'Ações', 
            width: 200,
            renderCell(params) {
                return (
                    <>
                        <Button
                            variant="contained"
                            color="warning"
                            disableElevation
                            //startIcon={<ModeIcon/>}
                            sx={{
                                marginRight: theme.spacing(1),
                            }}
                        >Editar</Button>
 
                        <Button
                          variant="contained"
                          color="error"
                          disableElevation
                         // startIcon={<DeleteIcon/>}
                        >Deletar</Button>
                    </>
                );
            },
        },
     ]; 
    return (
        <LayoutBasePagina 
            titulo="Cadastro de Usuários"
            subTitulo="Gerenciamento de Usuários"
            barraFerramentas={
                <BarraFerramentas
                    textoBotaoNovo="NOVO"
                    mostrarInputBusca
                    mostrarBotaoNovo
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }
            >
           {/*<Box height="40%">*/}
                <DataGrid
                    rows={rows}
                    columns={columns}
                    //pageSize={5}
                    //rowsPerPageOptions={[5]}
                    checkboxSelection
                    initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                />
           {/*</Box>*/}
        </LayoutBasePagina>
    );
};