import { Environment } from "../../../environment";
import { Api } from "../axios-config";
import { IFilial, IProduto, IUsuario } from "../public-interfaces/interfaces";

type TItemSolicitacao = {
    produto: IProduto;
    quantidade: number;
    observacao: string;
}

export interface IlistagemSolicitacao {
    idSol: number;
    numeroSol: number;
    solicitante: IUsuario;
    dataSolicitacao: Date;
    updatedAt: Date;
    status: string;
    statusPedido: string;
    itensSolicitados: TItemSolicitacao[];
    filial: IFilial
}

type TSolicitacaoMaterial =  {
    content: IlistagemSolicitacao[];
    totalElements: number;
    totalPages: number;
}

const getAllContaing = async (page = 0, filter?: string, filial?: number ): Promise<TSolicitacaoMaterial | Error> => {
    try {
        const urlRelativa = `/solicitacao?idFilial=${filial}&numeroSol=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
        const response = await Api.get(urlRelativa);
        if(response) {
            return {
                content: response.data.content,
                totalElements: Number(response.data.totalElements),
                totalPages: Number(response.data.totalPages),
            }
        }
        return new Error('Erro ao listar os registros.');
    }
    catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao listar os registros');
      }  
};

const getByStatusAndIdFilial = async (filial?: number ): Promise<TSolicitacaoMaterial | Error> => {
    try {
        const urlRelativa = `/solicitacao/status?idFilial=${filial}`;
        const response = await Api.get(urlRelativa);
        if(response) {
            return {
                content: response.data,
                totalElements: Number(1),
                totalPages: Number(1),
            }
        }
        return new Error('Erro ao listar os registros.');
    }
    catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao listar os registros');
      }  
};

const getById = async(id: number): Promise<IlistagemSolicitacao | Error> => {
    try 
    {
        const { data } = await Api.get(`/solicitacao/${id}`);
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

const create = async (dados: IlistagemSolicitacao): Promise<void | Error> => {
    try {
        await Api.post<IlistagemSolicitacao>('/solicitacao', dados);
    } 
    catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao inserir o registro.');
    }
};

export const SolicitacaoMateriais = {
    getAllContaing,
    getById,
    create,
    getByStatusAndIdFilial,
};