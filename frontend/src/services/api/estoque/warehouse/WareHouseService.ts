import { Environment } from "../../../../environment";
import { Api } from "../../axios-config";
import { IListagemFornecedor } from "../../fornecedores/FornecedorService";
import { IListagemProduto } from "../../produtos/ProdutoService";
import { IListagemUsuario } from "../../usuarios/UsuarioService";

export interface IListagemWareHouse {
  idWareHouse: number;
  dataEntrada: Date;
  quantidadeMinima: number;
  quantidadeMaxima: number;
  quantidadeIdeal: number;
  quantidadeAtual: number;
  status: number;
  usuario: IListagemUsuario;
  fornecedor: IListagemFornecedor;
  produto: IListagemProduto;
}

export interface IDetalheWareHouse {
  idWareHouse: number;
  dataEntrada: Date;
  quantidadeMinima: number;
  quantidadeMaxima: number;
  quantidadeIdeal: number;
  quantidadeAtual: number;
  status: number;
  usuario?: IListagemUsuario;
  fornecedor?: IListagemFornecedor;
  produto?: IListagemProduto;
  UsuarioFK: number;
  FornecedorFK: number;
  ProdutoFK: number;
}

type TWareHouseLista = {
  content: IListagemWareHouse[];
  totalElements: number;
  totalPages: number;
}

const getAllContaing = async (page = 0, filter?: string): Promise<TWareHouseLista | Error> => {
  try {
    const urlRelativa = `/wareHouse?produto=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
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

const getAll = async (): Promise<IDetalheWareHouse[] | Error> => {
  try {
    const urlRelativa = '/wareHouse/all';
    const response = await Api.get(urlRelativa);

    if(response) {
      return response.data
    }

    return new Error('Erro ao listar os registros.');
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string}).message || 'Erro ao listar os registros');
  }  
};


const getById = async (id: number): Promise<IDetalheWareHouse | Error> => {
  try 
  {
    const { data } = await Api.get(`/wareHouse/${id}`);
    if(data) {
      data.status === "ACTIVE" ? data.status = 1 : data.status = 0;
      return data;
    }

    return new Error("Erro ao consultar registro.");
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string}).message || 'Erro ao listar registro');
  }
};

const create = async (dados: Omit<IDetalheWareHouse, 'idWareHouse'>): Promise<void | Error> => {
  try 
  { 
    await Api.post<IDetalheWareHouse>('/wareHouse', dados);

  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};


const updateById = async (id: number, dados: IDetalheWareHouse): Promise<void | Error> => {
  try {      
    await Api.put<IDetalheWareHouse>(`/wareHouse/${id}`, dados);
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atulizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/wareHouse/${id}`);
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao deletar o registro.');
  }

};
export const WareHouseService = {
  getAll,
  getAllContaing,
  getById,
  create,
  updateById,
  deleteById,
};