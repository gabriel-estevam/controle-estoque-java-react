import { Environment } from "../../../environment";
import { Api } from "../axios-config";
const getAllContaing = async (page = 0, filter, filial) => {
    try {
        const urlRelativa = `/estoque/saida?idFilial=${filial}&produto=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
        const response = await Api.get(urlRelativa);
        if (response) {
            console.log(response.data.content);
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
        return new Error(error.message || 'Erro ao listar os registros');
    }
};
const create = async (dados) => {
    try {
        await Api.post('/estoque/saida', dados);
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao criar o registro.');
    }
};
export const EstoqueSaidaService = {
    getAllContaing,
    create,
};
