import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IEndereco {
  endereco: string;
  cep: string;
  numero: string;
  complemento: string | null | undefined;
  cidade: string
  estado: string
}

export interface IListagemFilial {
  id: number;
  name: string;
  phoneNumber: string;
  cnpj: string;
  status: number;
  usuarioFK: number;
  endereco: IEndereco;
}

export interface IDetalheFilial {
  id: number;
  name: string;
  phoneNumber: string;
  cnpj: string;
  status: number;
  usuarioFK: number;
  Endereco: IEndereco;
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

//@ts-ignore
const getById = async (id: number): Promise<IDetalheFilial | Error> => {
  try 
  {
    const { data } = await Api.get<IDetalheFilial>(`/filiais/${id}`);
    if(data) {
      return data;
    }

    return new Error("Erro ao consultar Filial.");
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string}).message || 'Erro ao listar registro');
  }
};

const create = async (dados: Omit<IDetalheFilial, 'id'>): Promise<number | Error> => {
  try 
  {
    if (!dados.Endereco.complemento) {
      dados.Endereco.complemento = "N/A";
    }
    
    const { data } = await Api.post<IDetalheFilial>('/filiais', dados);

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

//@ts-ignore
const updateById = async (id: number, dados: Omit<IDetalheFilial, 'id'>): Promise<number | Error> => {
  try {      
    const { data } = await Api.put<IDetalheFilial>(`/filiais/${id}`, dados);
      
    if(data) {
      return data.id;
    }
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atulizar o registro.');
  }
};

export const FilialService = {
  getAll,
  getById,
  create,
  updateById,
};