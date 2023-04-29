import axios from 'axios';

interface ICEP {
    cep: string;
	state: string;
    city: string;
	neighborhood: string;
	street: string;
};

const searchCEP = async (cep : string): Promise<ICEP | Error> => {
    try {
        const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        
        if(data) {
            return data;
        }      
        return new Error("Erro ao consultar CEP");
    } 
    catch (error) 
    {
        console.error(error);
        return new Error('CEP NÃO ENCONTRADO');
    }
};

export const PublicService = {
    searchCEP,
};