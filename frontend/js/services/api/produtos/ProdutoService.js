import { Environment } from "../../../environment";
import { Api } from "../axios-config";
const getAllContaing = async (page = 0, filter) => {
    try {
        const urlRelativa = `/produtos?nome=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
        const response = await Api.get(urlRelativa);
        if (response) {
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
const getAll = async () => {
    try {
        const urlRelativa = '/produtos/all';
        const response = await Api.get(urlRelativa);
        if (response) {
            return response.data;
        }
        return new Error('Erro ao listar os registros.');
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao listar os registros');
    }
};
const getById = async (id) => {
    try {
        const { data } = await Api.get(`/produtos/${id}`);
        if (data) {
            //@ts-ignore
            data.status === "ACTIVE" ? data.status = 1 : data.status = 0;
            return data;
        }
        return new Error("Erro ao consultar Produto.");
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao listar registro');
    }
};
const create = async (dados) => {
    try {
        const { data } = await Api.post('/produtos', dados);
        if (data) {
            //@ts-ignore
            return data.idProduto;
        }
        return new Error('Erro ao criar registro.');
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao criar o registro.');
    }
};
const updateById = async (id, dados) => {
    try {
        const { data } = await Api.put(`/produtos/${id}`, dados);
        if (data) {
            return data.idProduto;
        }
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao atulizar o registro.');
    }
};
export const ProdutoService = {
    getAll,
    getAllContaing,
    getById,
    create,
    updateById,
};
