import axios from 'axios';
;
const searchCEP = async (cep) => {
    try {
        const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        if (data) {
            return data;
        }
        return new Error("Erro ao consultar CEP");
    }
    catch (error) {
        console.error(error);
        return new Error('CEP NÃO ENCONTRADO');
    }
};
export const PublicService = {
    searchCEP,
};
