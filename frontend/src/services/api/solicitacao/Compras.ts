import { Api } from "../axios-config";

interface IDados {
    updatedAt: string;
    status: number;
    filialFK: number;
    solicitanteFK: number
}

const updateSolicitacao = async(id: number, dados: IDados): Promise< void | Error> => {

    try {
        const status = dados.status;

        if(status === 3) {
            dados.status = 0;
        }

        await Api.put<IDados>(`/solicitacao/${id}`, dados);
    }

    catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atulizar o registro.');    
    }
};

export const ComprasService = {
    updateSolicitacao,
}