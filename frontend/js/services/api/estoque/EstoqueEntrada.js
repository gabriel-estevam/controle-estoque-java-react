import { Environment } from "../../../environment";
import { Api } from "../axios-config";
const getAllContaing = async (page = 0, filter, filial) => {
    try {
        const urlRelativa = `/estoque/entrada?idFilial=${filial}&nome=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
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
        const urlRelativa = '/estoque/entrada/all';
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
        const { data } = await Api.get(`/estoque/entrada/${id}`);
        if (data) {
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
        await Api.post('/estoque/entrada', dados);
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao criar o registro.');
    }
};
const deleteById = async (id) => {
    try {
        await Api.delete(`/estoque/entrada/${id}`);
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao deletar o registro.');
    }
};
export const EstoqueEntradaService = {
    getAll,
    getAllContaing,
    getById,
    create,
    deleteById,
};
