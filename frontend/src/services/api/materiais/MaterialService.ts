import { Environment } from "../../../environment";
import { Api } from "../axios-config";
import { IListagemFornecedor } from "../fornecedores/FornecedorService";
import { IListagemProduto } from "../produtos/ProdutoService";
import { IListagemUsuario } from "../usuarios/UsuarioService";

export interface IListagemMaterial {
  idMaterial: number;
  quantidadeMinima: number;
  quantidadeMaxima: number;
  quantidadeIdeal: number;
  quantidadeAtual: number;
  status: number;
  usuario: IListagemUsuario;
  fornecedor: IListagemFornecedor;
  produto: IListagemProduto;
}

export interface IDetalheMaterial {
  idMaterial: number;
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

type TMaterialLista = {
  content: IListagemMaterial[];
  totalElements: number;
  totalPages: number;
}

const getAllContaing = async (page = 0, filter?: string): Promise<TMaterialLista | Error> => {
  try {
    const urlRelativa = `/materiais?produto=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
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

const getAll = async (): Promise<IDetalheMaterial[] | Error> => {
  try {
    const urlRelativa = '/materiais/all';
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


const getById = async (id: number): Promise<IDetalheMaterial | Error> => {
  try 
  {
    const { data } = await Api.get(`/materiais/${id}`);
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

const create = async (dados: Omit<IDetalheMaterial, 'idMaterial'>): Promise<void | Error> => {
  try 
  { 
    await Api.post<IDetalheMaterial>('/materiais', dados);

  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};


const updateById = async (id: number, dados: IDetalheMaterial): Promise<void | Error> => {
  try {      
    await Api.put<IDetalheMaterial>(`/materiais/${id}`, dados);
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atulizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/materiais/${id}`);
  } 
  catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao deletar o registro.');
  }

};
export const MaterialService = {
  getAll,
  getAllContaing,
  getById,
  create,
  updateById,
  deleteById,
};