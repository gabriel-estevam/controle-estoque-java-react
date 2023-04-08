import { Environment } from './../../../environment/index';
import { Api } from "../axios-config";

export interface IListagemUsuario {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    filialId: number;
    filialName: string;
}

export interface IDetalheUsuario {
    id: number;
    name: string;
    email: string;
    password: string;
    role: number;
    status: number;
    filialFK: number;
   // filialName: string;
}
export interface IDetalheUsuarioEdit {
    id?: number;
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

const getAll = async (page = 0, filter : string): Promise<TUsuarioLista | Error> => {
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

const getById = async (id: number): Promise<IDetalheUsuario | Error> => {
    try {
       const { data } = await Api.get(`/users/${id}`);

       if(data) {
        data.role === "ADMIN" ? data.role = 1 : data.role = 0;
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

const create = async (dados: Omit<IDetalheUsuario, 'id'>): Promise<number | Error> => {
    try {
        dados.role === 1 ? dados.role = 0 : dados.role = 1;
        const { data } = await Api.post<IDetalheUsuario>('/users', dados);
        if(data) {
            return data.id;
        }
        
        return new Error('Erro ao criar registro.');

    } 
    catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id?: number, dados?: Omit<IDetalheUsuarioEdit, 'password' & 'id'>): Promise<number | Error | undefined> => {
    try {

        //@ts-ignore
        dados.role === 1 ? dados.role = 0 : dados.role = 1;
        
        const { data } = await Api.put<IDetalheUsuarioEdit>(`/users/${id}`, dados);
        
        if(data) {
            return data.id;
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
    getById,
    create,
    updateById,
    deleteById,
};