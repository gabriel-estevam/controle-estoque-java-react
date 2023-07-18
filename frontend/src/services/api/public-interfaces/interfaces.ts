export interface IEndereco {
    logradouro: string;
    cep: string;
    numero: string;
    complemento: string | null ;
    cidade: string
    estado: string
}

export interface IFornecedor {
    idFornecedor: number;
    name: string;
    cnpj: string;
    email: string;
    phoneNumber: string;
    status: number;
    endereco: IEndereco;
}

export interface IUnidadeMedida {
    idUnidadeMedida: number;
    unidadeMedida: string;
    sigla: string;
}
  
export interface IProduto {
    idProduto: number;
    nome: string;
    status: number;
    unidadeMedida: IUnidadeMedida;
}

export interface IFilial {
    idFilial: number ;
    name: string;
    phoneNumber: string;
    status: string;
    cnpj: string;
    //endereco: IEndereco;
}
  
export interface IUsuario {
    idUsuario: number ;
    name: string;
    role: string;
    status: string;
    filial: IFilial;
}

export interface IItensEstoque {
    quantidadeAtual: number;
    quantidadeIdeal: number;
    quantidadeMinima: number;
    quantidadeMaxima: number;
    fornecedor: IFornecedor;
    produto: IProduto;
}