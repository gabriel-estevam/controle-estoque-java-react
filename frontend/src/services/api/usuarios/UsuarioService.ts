import { Environment } from './../../../environment/index';
import { Api } from "../axios-config";

export interface IListagemUsuario {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    filialId: number;
}

interface IDetalheUsuario {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    filialId: number;
}

type TUsuarioLista = {
    data: IListagemUsuario[];
}

const getAll = async (page = 1, filter = ''): Promise<TUsuarioLista | Error> => {
    try {
        const urlRelativa = '/users';
        const response = await Api.get(urlRelativa);
        //console.log("TESTE " + response);
        if(response) {
            return response;
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
        return data;
       }

       return new Error('Erro ao consultar usuário.');
    } 
    catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao listar os registros');
    }

};

const create = async (): Promise<any> => {
    
};
const updateById = async (): Promise<any> => {
    
};
const deleteById = async (): Promise<any> => {
    
};

export const UsuarioService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};