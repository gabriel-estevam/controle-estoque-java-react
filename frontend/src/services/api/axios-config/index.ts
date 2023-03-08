import axios from 'axios';
import { Environment } from '../../../environment/index';
import { responseInterceptor, errorInterceptor } from '../interceptors';

const Api = axios.create({
    baseURL: Environment.URL_BASE,
    headers:{Authorization: `Bearer ${Environment.TOKEN}`},
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { Api };