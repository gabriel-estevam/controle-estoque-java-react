import { Environment } from "../../../environment";
import { Api } from "../axios-config";
const getAllContaing = async (page = 0, filter) => {
    try {
        const urlRelativa = `/fornecedores?name=${filter}&page=${page}&size=${Environment.LIMITE_DE_LINHAS}`;
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
        const urlRelativa = '/fornecedores/all';
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
        const { data } = await Api.get(`/fornecedores/${id}`);
        if (data) {
            //@ts-ignore
            data.status === "ACTIVE" ? data.status = 1 : data.status = 0;
            return data;
        }
        return new Error("Erro ao consultar Fornecedor.");
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao listar registro');
    }
};
const create = async (dados) => {
    try {
        //@ts-ignore
        if (!dados.Endereco.complemento) {
            //@ts-ignore
            dados.endereco.complemento = "N/A";
        }
        const { data } = await Api.post('/fornecedores', dados);
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
        const { data } = await Api.put(`/fornecedores/${id}`, dados);
        if (data) {
            return data.idFornecedor;
        }
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao atulizar o registro.');
    }
};
const deleteById = async (id) => {
    try {
        await Api.delete(`/fornecedores/${id}`);
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Erro ao deletar o registro.');
    }
};
export const FornecedorService = {
    getAll,
    getAllContaing,
    getById,
    create,
    updateById,
    deleteById,
};
