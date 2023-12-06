import { Environment } from "../../../environment";
import { Api } from "../axios-config";
const getAllContaing = async (page = 0, filter) => {
    try {
        const urlRelativa = `/unidadeMedida?unidadeMedida=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
        const response = await Api.get(urlRelativa);
        if (response) {
            return {
                content: response.data.content,
                totalElements: Number(response.data.totalElements),
                totalPages: Number(response.data.totalPages),
            };
        }
        return Error('Erro ao listar os registro.');
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao listar os registros');
    }
};
const getAll = async () => {
    try {
        const urlRelativa = '/unidadeMedida/all';
        const response = await Api.get(urlRelativa);
        if (response) {
            return response.data;
        }
        return Error('Erro ao listar os registro.');
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao listar os registros');
    }
};
export const UnidadeMedidaService = {
    getAll,
    getAllContaing,
};
