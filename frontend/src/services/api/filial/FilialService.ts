import { Environment } from "../../../environment";
import { Api } from "../axios-config";

interface IEndereco {
  endereco: string;
  cep: string;
  numero: number;
  complemento: string;
  cidade: string
  estado: string
}

export interface IListagemFilial {
    id: number;
    name: string;
    phoneNumber: string;
    cnpj: string;
    status: string;
    usuarioId: number;
    endereco: IEndereco;
}

type TFilialLista = {
    content: IListagemFilial[];
    totalElements: number;
    totalPages: number;
}

const getAll = async (page = 0, filter?: string): Promise<TFilialLista | Error> => {
  try {
    const urlRelativa = `/filiais?name=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
    const response = await Api.get(urlRelativa);

    if(response) {
        return {
            content: response.data.content,
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

export const FilialService = {
  getAll,
};