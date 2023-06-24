import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IUnidadeMedida {
  idUnidadeMedida: number;
  unidadeMedida: string;
  sigla: string;
}

export interface IListagemProduto {
  idProduto: number;
  nome: string;
  status: number;
  unidadeMedida: IUnidadeMedida;
}

export interface IDetalheProduto {
  idProduto: number | null | undefined;
  nome: string;
  status: number;
  UnidadeMedidaFK: number;
  unidadeMedida?: IUnidadeMedida;
}

export interface IProdutos {
  idProduto: number;
  nome: string;
  status: number;
  UnidadeMedidaFK: number;
  unidadeMedida: IUnidadeMedida;
}


type TProdutoLista = {
  content: IListagemProduto[];
  totalElements: number;
  totalPages: number;
}

const getAllContaing = async (page = 0, filter?: string): Promise<TProdutoLista | Error> => {
  try {
    const urlRelativa = `/produtos?nome=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
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

const getAll = async (): Promise<IProdutos[] | Error> => {
  try {
    const urlRelativa = '/produtos/all';
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

const getById = async (id: number): Promise<IDetalheProduto | Error> => {
  try 
  {
    const { data } = await Api.get<IDetalheProduto>(`/produtos/${id}`);
    if(data) {
      //@ts-ignore
      data.status === "ACTIVE" ? data.status = 1 : data.status = 0;
      
      return data;
    }

    return new Error("Erro ao consultar Produto.");
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string}).message || 'Erro ao listar registro');
  }
};


const create = async (dados: IDetalheProduto): Promise<number | Error | undefined | null> => {
  try 
  {
    
    const { data } = await Api.post<IDetalheProduto>('/produtos', dados);

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


const updateById = async (id: number, dados: IDetalheProduto): Promise<number | Error | undefined | null> => {
  try 
  {      
    const { data } = await Api.put<IDetalheProduto>(`/produtos/${id}`, dados);
      
    if(data) {
      return data.idProduto;
    }
  } 

  catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atulizar o registro.');
  }

};

export const ProdutoService = {
  getAll,
  getAllContaing,
  getById,
  create,
  updateById,
};