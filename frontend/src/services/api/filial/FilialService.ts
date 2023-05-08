import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IEndereco {
  logradouro: string;
  cep: string;
  numero: string;
  complemento: string | null | undefined;
  cidade: string
  estado: string
}

export interface IListagemFilial {
  idFilial: number;
  name: string;
  phoneNumber: string;
  cnpj: string;
  status: number;
  usuarioFK: number;
  endereco: IEndereco;
}

export interface IDetalheFilial {
  idFilial: number;
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
    const { data } = await Api.get(`/filiais/${id}`);
    if(data) {
      data.status === "ACTIVE" ? data.status = 1 : data.status = 0;
      return data;
    }

    return new Error("Erro ao consultar Filial.");
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string}).message || 'Erro ao listar registro');
  }
};

const create = async (dados: Omit<IDetalheFilial, 'idFilial'>): Promise<number | Error> => {
  try 
  {
    if (!dados.Endereco.complemento) {
      dados.Endereco.complemento = "N/A";
    }
    
    const { data } = await Api.post<IDetalheFilial>('/filiais', dados);

    if(data) {
      return data.idFilial;
    }
    return new Error('Erro ao criar registro.');
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

//@ts-ignore
const updateById = async (id: number, dados: IDetalheFilial): Promise<number | Error> => {
  try {      
    const { data } = await Api.put<IDetalheFilial>(`/filiais/${id}`, dados);
      
    if(data) {
      return data.idFilial;
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