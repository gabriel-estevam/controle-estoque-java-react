import { Environment } from './../../../environment/index';
import { Api } from "../axios-config";

export interface IListagemUsuario {
    idUsuario: number;
    name: string;
    email: string;
    role: string;
    status: string;
    filialId: number;
    filialName: string;
}

export interface IDetalheUsuario {
    idUsuario: number;
    name: string;
    email: string;
    password: string;
    role: number;
    status: number;
    filialFK: number;
    filialName?: string;
}
export interface IDetalheUsuarioEdit {
    idUsuario?: number;
    name: string;
    email: string;
    password: string;
    role: number;
    status: number;
    filialFK: number;
   // filialName: string;
}


type TUsuarioLista = {
    content: IListagemUsuario[];
    totalElements: number;
    totalPages: number;
}

const getAllContaing = async (page = 0, filter : string): Promise<TUsuarioLista | Error> => {
    try {
        const urlRelativa = `/users?name=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
        const response = await Api.get(urlRelativa);

        if(response) {
            return {
                content: response.data.content,
                //totalElements: Number(response.data.totalElements || Environment.LIMITE_DE_LINHAS),
                totalElements: Number(response.data.totalElements),
                totalPages: Number(response.data.totalPages),
            };
        }

        return new Error('Erro ao listar os registros.');
    } 
    catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao listar os registros');
    }
};

const getAll = async (): Promise<IDetalheUsuario[] | Error> => {
    try {
        const urlRelativa = '/users/all';
        const response = await Api.get(urlRelativa);

        if(response) {
            return response.data;
        }

        return new Error('Erro ao listar os registros.');
    } 
    catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao listar os registros');
    }
};

const getById = async (id: number): Promise<IDetalheUsuario | Error> => {
    try {
       const { data } = await Api.get(`/users/${id}`);

       if(data) 
       {    
           switch (data.role) {
            case "ADMIN":
                data.role = 2;    
            break;

            case "USER":
                data.role = 1;
            break;

            case "MANAGERS":
                data.role = 3;
            break;
            
            default:
                data.role = undefined;
            break;
           }
            data.status === "ACTIVE" ? data.status = 1 : data.status = 0;
            return data;
       }

       return new Error('Erro ao consultar usuário.');
    } 
    catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao listar os registros');
    }

};

const create = async (dados: Omit<IDetalheUsuario, 'idUsuario'>): Promise<number | Error> => {
    try 
    {
        switch (dados.role) {
            case 2:
                dados.role = 1;    
            break;
            
            case 1:
                dados.role = 0;
            break;
            
            case 3: 
                dados.role = 2;
            break;

            default:
                dados.role = 0;
            break;
        }

        dados.email.toLowerCase();
        
        const { data } = await Api.post<IDetalheUsuario>('/users', dados);
        if(data) {
            return data.idUsuario;
        }
        
        return new Error('Erro ao criar registro.');

    } 
    catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id?: number, dados?: Omit<IDetalheUsuarioEdit, 'password' & 'idUsuario'>): Promise<number | Error | undefined> => {
    try {
        if(dados?.role === 1) {
            dados.role = 0;
        } else if(dados?.role === 2) {
            dados.role = 1;
        } else {
            //@ts-ignore
            dados.role = 2;
        }
        //@ts-ignore
       // dados.role === 1 ? dados.role = 0 : dados.role = 1;
        dados?.email.toLocaleLowerCase();
        const { data } = await Api.put<IDetalheUsuarioEdit>(`/users/${id}`, dados);
        
        if(data) {
            return data.idUsuario;
        }
    } 
    catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atulizar o registro.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/users/${id}`);
    } 
    catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao deletar o registro.');
    }
};

export const UsuarioService = {
    getAll,
    getAllContaing,
    getById,
    create,
    updateById,
    deleteById,
};