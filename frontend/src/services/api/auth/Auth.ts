import { Api } from "../axios-config";

export interface ILogin {
    email: string;
    password: string;
}

type TToken = {
    token: string;
}

const signIn =async (dados: ILogin): Promise<string | Error> => {
    try 
    {
        const { data } = await Api.post<TToken>('/auth', dados);
        if(data) {
            return data.token;
        }
        return new Error('Erro ao logar no Sistema!');
    } 
    catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Usuário ou Senha invalido!');
    }
}
export const Auth = {
    signIn,
}