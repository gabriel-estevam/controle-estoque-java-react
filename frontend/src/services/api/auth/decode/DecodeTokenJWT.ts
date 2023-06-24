import jwtDecode from "jwt-decode";
import { IDetalheUsuario } from "../../usuarios/UsuarioService";

type TJWT = {
    sub: string;
    usuario: IDetalheUsuario;
    exp: number;
}
const decodeTokenJWT = (token : string) => {
    
    const tokenDecode = jwtDecode<TJWT>(token)

    return tokenDecode;
};

export const DecodeTokenJWT = {
    decodeTokenJWT,
};