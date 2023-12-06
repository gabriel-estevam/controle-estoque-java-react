import { Api } from "../axios-config";
const signIn = async (dados) => {
    try {
        const { data } = await Api.post('/auth', dados);
        if (data) {
            return data.token;
        }
        return new Error('Erro ao logar no Sistema!');
    }
    catch (error) {
        console.error(error);
        return new Error(error.message || 'Usuário ou Senha invalido!');
    }
};
export const Auth = {
    signIn,
};
