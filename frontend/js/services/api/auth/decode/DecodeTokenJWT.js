import jwtDecode from "jwt-decode";
const decodeTokenJWT = (token) => {
    const tokenDecode = jwtDecode(token);
    return tokenDecode;
};
export const DecodeTokenJWT = {
    decodeTokenJWT,
};
