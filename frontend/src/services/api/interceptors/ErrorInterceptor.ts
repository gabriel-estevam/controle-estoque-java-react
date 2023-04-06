import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
    if(error.message === 'Network Error') {
        return Promise.reject(new Error('Erro de conexão.'));
    }
    
    if(error.response?.status === 401) {
        return Promise.reject(new Error('Erro ao autenticar! ' + error.message))
    }

    if(error.response?.status === 403) {
        return Promise.reject(new Error('Token não informado!'));
    }

    if(error.response?.status === 400) {
        let dataResponseError: any;
        dataResponseError = JSON.stringify(error.response.data);
        const dataJSON = JSON.parse(dataResponseError);
        return Promise.reject(new Error(dataJSON.message));
    }

    return Promise.reject(error);
};