const cep = (e) => {
    let value;
    e.currentTarget.maxLength = 9;
    value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    return value;
};
const cnpj = (e) => {
    let value;
    e.currentTarget.maxLength = 14;
    value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    return value;
};
const telefoneFixo = (e) => {
    let value;
    e.currentTarget.maxLength = 10;
    value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d{4})(\d{4})/, "($1)$2-$3");
    return value;
};
export const Mask = {
    cep,
    cnpj,
    telefoneFixo,
};
