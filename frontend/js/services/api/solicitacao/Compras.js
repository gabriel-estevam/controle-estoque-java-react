import { Api } from "../axios-config";
const updateSolicitacao = async (id, dados) => {
    try {
        const status = dados.status;
        if (status === 3) {
            dados.status = 0;
        }
        await Api.put(`/solicitacao/${id}`, dados);
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao atulizar o registro.');
    }
};
export const ComprasService = {
    updateSolicitacao,
};
