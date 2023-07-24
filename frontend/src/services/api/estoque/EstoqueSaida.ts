import { Environment } from "../../../environment";
import { Api } from "../axios-config";
import { IFilial, IFornecedor, IProduto, IUsuario } from "../public-interfaces/interfaces";

export type TItensEstoque = {
  quantidadeAtual: number;
  quantidadeIdeal: number;
  quantidadeMinima: number;
  quantidadeMaxima: number;
  fornecedor: IFornecedor;
  produto: IProduto;
}

interface IEstoqueEntrada {
  idEstoque: number;
  itemEstoque: TItensEstoque[];
  usuario: IUsuario;
  dataEntrada: Date;
}
export interface IListagemEstoqueSaida {
  id: number;
  data: Date;
  quantidade: number;
  usuario: IUsuario;
  filial: IFilial;
  estoque: IEstoqueEntrada;
}

export interface IDetalheEstoqueSaida {
  estoqueFK: number;
  usuarioFK: number;
  filialFK: number;
  produtoFK: number;
  fornecedorFK: number;
  data: string;
  quantidade: number;
}

type TEstoqueSaidaLista = {
  content: IListagemEstoqueSaida[];
  totalElements: number;
  totalPages: number;
}

const getAllContaing = async (page = 0, filter?: string, filial?: number): Promise<TEstoqueSaidaLista | Error> => {
  try {
    const urlRelativa = `/estoque/saida?idFilial=${filial}&produto=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
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

const create = async (dados: Omit<IDetalheEstoqueSaida, 'itensEstoque'>): Promise<void | Error> => {
  try {
    await Api.post<IDetalheEstoqueSaida>('/estoque/saida', dados);

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

export const EstoqueSaidaService = {
  getAllContaing,
  create,
};