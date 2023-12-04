import { Api } from "../axios-config";

export interface IRecebimento {
    idRecebimento: number;
    notaEntrada: number;
    observacao: string;
    dataEntrada: Date;
    usuarioFK: number;
    filialFK: number
    solicitacaoFK: number;
}

const create = async (dados: IRecebimento): Promise<void | Error> => {
    try {
        await Api.post<IRecebimento>('/recebimento', dados);
    } 
    catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao inserir o registro.');
    }
}

export const RecebimentoService = {
    create,
}