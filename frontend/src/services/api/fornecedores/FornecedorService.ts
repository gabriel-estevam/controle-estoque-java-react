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

export interface IListagemFornecedor {
  idFornecedor: number;
  name: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  status: number;
  endereco: IEndereco;
}

export interface IDetalheFornecedor {
  idFornecedor: number | null | undefined;
  name: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  status: number;
  endereco?: IEndereco;
}

type TFornecedorLista = {
  content: IListagemFornecedor[];
  totalElements: number;
  totalPages: number;
}

const getAllContaing = async (page = 0, filter?: string): Promise<TFornecedorLista | Error> => {
  try {
    const urlRelativa = `/fornecedores?name=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
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

const getAll = async (): Promise<IDetalheFornecedor[] | Error> => {
  try {
    const urlRelativa = '/fornecedores/all';
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

const getById = async (id: number): Promise<IDetalheFornecedor | Error> => {
  try 
  {
    const { data } = await Api.get<IDetalheFornecedor>(`/fornecedores/${id}`);
    if(data) {
      //@ts-ignore
      data.status === "ACTIVE" ? data.status = 1 : data.status = 0;
      
      return data;
    }

    return new Error("Erro ao consultar Fornecedor.");
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string}).message || 'Erro ao listar registro');
  }
};

const create = async (dados: IDetalheFornecedor): Promise<number | Error | undefined | null> => {
  try 
  {
    //@ts-ignore
    if (dados.Endereco.complemento == null || undefined) {
      //@ts-ignore
      dados.endereco.complemento = "N/A";
    }
    
    const { data } = await Api.post<IDetalheFornecedor>('/fornecedores', dados);

    if(data) {
      //@ts-ignore
      return data.idProduto;
    }
    return new Error('Erro ao criar registro.');
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};


const updateById = async (id: number, dados: IDetalheFornecedor): Promise<number | Error | undefined | null> => {
  try 
  {      
    const { data } = await Api.put<IDetalheFornecedor>(`/fornecedores/${id}`, dados);
      
    if(data) {
      return data.idFornecedor;
    }
  } 

  catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atulizar o registro.');
  }

};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/fornecedores/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao deletar o registro.');
  }
};

export const FornecedorService = {
  getAll,
  getAllContaing,
  getById,
  create,
  updateById,
  deleteById,
};