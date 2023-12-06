import { Environment } from "../../../environment";
import { Api } from "../axios-config";
const getAllContaing = async (page = 0, filter) => {
    try {
        const urlRelativa = `/filiais?name=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
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
        const urlRelativa = '/filiais/all';
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
//@ts-ignore
const getById = async (id) => {
    try {
        const { data } = await Api.get(`/filiais/${id}`);
        if (data) {
            data.status === "ACTIVE" ? data.status = 1 : data.status = 0;
            return data;
        }
        return new Error("Erro ao consultar Filial.");
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao listar registro');
    }
};
const create = async (dados) => {
    try {
        if (!dados.Endereco.complemento) {
            dados.Endereco.complemento = "N/A";
        }
        const { data } = await Api.post('/filiais', dados);
        if (data) {
            return data.idFilial;
        }
        return new Error('Erro ao criar registro.');
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao criar o registro.');
    }
};
//@ts-ignore
const updateById = async (id, dados) => {
    try {
        const { data } = await Api.put(`/filiais/${id}`, dados);
        if (data) {
            return data.idFilial;
        }
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao atulizar o registro.');
    }
};
export const FilialService = {
    getAll,
    getAllContaing,
    getById,
    create,
    updateById,
};
