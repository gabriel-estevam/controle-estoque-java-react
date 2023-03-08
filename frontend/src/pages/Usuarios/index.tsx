import React, { useEffect, useMemo, useState } from 'react';
import { LayoutBasePagina } from '../layouts';
import { BarraFerramentas } from '../../components/BarraFerramentas';
import { useSearchParams } from 'react-router-dom';
import { IListagemUsuario, UsuarioService } from '../../services/api/usuarios/UsuarioService';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, useTheme } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

export const Usuarios: React.FC = () => {
    const theme = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();

    const [rowss, setRows] = useState<IListagemUsuario[]>([]);
    const [isLoading, setIsLoading] = useState(true); //verificar se foi carregado os dados no backend
    
    const rows = [
        { id: 1, name: 'Snow', email: 'Jon', role: 35 },
        { id: 2, name: 'Lannister', email: 'Cersei', role: 'ADMIN' },
        { id: 3, name: 'Lannister', email: 'Jaime', role: 'ADMIN' },
        { id: 4, name: 'Stark', email: 'Arya', role: 'ADMIN' },
        { id: 5, name: 'Targaryen', email: 'Daenerys', role: 'ADMIN' },
        { id: 6, name: 'Melisandre', email: null, role: 'ADMIN' },
        { id: 7, name: 'Clifford', email: 'Ferrara', role: 'ADMIN' },
        { id: 8, name: 'Frances', email: 'Rossini', role: 'ADMIN' },
        { id: 9, name: 'Roxie', email: 'Harvey', role: 'ADMIN' },
        { id: 9, name: 'Roxie', email: 'Harvey', role: 'ADMIN' },
        { id: 9, name: 'Roxie', email: 'Harvey', role: 'ADMIN' },
        { id: 9, name: 'Roxie', email: 'Harvey', role: 'ADMIN' },
        { id: 9, name: 'Roxie', email: 'Harvey', role: 'ADMIN' },
        { id: 9, name: 'Roxie', email: 'Harvey', role: 'ADMIN' },
        { id: 9, name: 'Roxie', email: 'Harvey', role: 'ADMIN' },
      ];

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    },[searchParams]);

    useEffect(() => {
        setIsLoading(true);

        UsuarioService.getAll()
        .then((result) => {
            setIsLoading(false);

            if(result instanceof Error) {
                alert(result.message);
            }
            else {
              console.log(result.data);
             setRows(result.data);
            }
        });
    }, [busca]);

    const columns: GridColDef[] = [
      //  { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Usuário', width: 130 },
        { field: 'email', headerName: 'Login', width: 200 },
        { field: 'role', headerName: 'Tipo', width: 70 },
        //{ field: 'status', headerName: 'Status', width: 80 },
        //{ field: 'filialId', headerName: 'Filial ID', width: 200 },
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
                            startIcon={<ModeIcon/>}
                            sx={{
                                    marginRight: theme.spacing(1),
                                }}
                        >Editar</Button>

                        <Button
                         variant="contained"
                         color="error"
                         disableElevation
                         startIcon={<DeleteIcon/>}
                        >Deletar</Button>
                    </>
                );
            },
        },
        /*
        {
          field: 'role',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params: GridValueGetterParams) =>
            `${params.row.email || ''} ${params.row.name || ''}`,
        },*/
    ];
    
    return (
        <LayoutBasePagina 
            titulo="Cadastro de Usuários"
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
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection={false}
                sx={{
                    margin: 1,
                    width: 'auto',
                }}
            />
        </LayoutBasePagina>
    );
};