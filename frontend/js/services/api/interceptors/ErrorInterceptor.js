export const errorInterceptor = (error) => {
    if (error.message === 'Network Error') {
        return Promise.reject(new Error('Erro de conexão.'));
    }
    if (error.response?.status === 401) {
        let dataResponseError;
        dataResponseError = JSON.stringify(error.response.data);
        const dataJSON = JSON.parse(dataResponseError);
        return Promise.reject(new Error(dataJSON.message));
    }
    if (error.response?.status === 403) {
        return Promise.reject(new Error('Token não informado!'));
    }
    if (error.response?.status === 400) {
        let dataResponseError;
        dataResponseError = JSON.stringify(error.response.data);
        const dataJSON = JSON.parse(dataResponseError);
        return Promise.reject(new Error(dataJSON.message));
    }
    return Promise.reject(error);
};
