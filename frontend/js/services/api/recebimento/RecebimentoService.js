import { Api } from "../axios-config";
const create = async (dados) => {
    try {
        await Api.post('/recebimento', dados);
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao inserir o registro.');
    }
};
export const RecebimentoService = {
    create,
};
