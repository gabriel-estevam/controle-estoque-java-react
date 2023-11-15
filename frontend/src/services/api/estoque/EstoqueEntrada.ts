import { Environment } from "../../../environment";
import { Api } from "../axios-config";
import { IFornecedor, IProduto, IUsuario } from "../public-interfaces/interfaces";

interface IItemEstoque {
  quantidadeAtual: number | undefined;
  quantidadeIdeal: number | undefined;
  quantidadeMinima: number | undefined;
  quantidadeMaxima: number | undefined;
  fornecedorFK: number;
  produtoFK: number;
}

export type TItensEstoque = {
  quantidadeAtual: number;
  quantidadeIdeal: number;
  quantidadeMinima: number;
  quantidadeMaxima: number;
  fornecedor: IFornecedor;
  produto: IProduto;
}

export interface IListagemEstoqueEntrada {
  idEstoque: number;
  itemEstoque: TItensEstoque[];
  usuario: IUsuario;
  dataEntrada: Date;
}

export interface IDetalheEstoqueEntrada {
  idEstoque: number | undefined | null;
  dataEntrada: string;
  usuarioFK: number;
  itensEstoque: IItemEstoque[];
}

type TEstoqueEntradaLista = {
  content: IListagemEstoqueEntrada[];
  totalElements: number;
  totalPages: number;
}

const getAllContaing = async (page = 0, filter?: string, filial?: number): Promise<TEstoqueEntradaLista | Error> => {
  try {
    const urlRelativa = `/estoque/entrada?idFilial=${filial}&nome=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
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

const getAll = async (): Promise<IListagemEstoqueEntrada[] | Error> => {
  try {
    const urlRelativa = '/estoque/entrada/all';
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

const getById = async (id: number): Promise<IDetalheEstoqueEntrada | Error> => {
  try 
  {
    const { data } = await Api.get<IDetalheEstoqueEntrada>(`/estoque/entrada/${id}`);
    
    if(data) {
      return data;
    }

    return new Error("Erro ao consultar Produto.");
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string}).message || 'Erro ao listar registro');
  }
};


const create = async (dados: IDetalheEstoqueEntrada): Promise<void | Error> => {
  try {
    await Api.post<IDetalheEstoqueEntrada>('/estoque/entrada', dados);

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/estoque/entrada/${id}`);
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao deletar o registro.');
  }

};

export const EstoqueEntradaService = {
  getAll,
  getAllContaing,
  getById,
  create,
  deleteById,
};