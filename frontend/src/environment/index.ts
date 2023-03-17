export const Environment = {
    /** 
    * Define a quantidade de linhas a ser carregadas por padrão nas listagens
    */
    LIMITE_DE_LINHAS: 5,
    
    /** 
    * Placeholder exibido nas inputs 
    */
    INPUT_DE_BUSCA: 'Pesquisar...',

    /**
     * Texto exibido quando nenhum registro é encontrado em uma listagem
    */
    LISTAGEM_VAZIA: 'Nenhum registro encontrado.',

    /**
     * url base de consulta ao backend
    */
    URL_BASE: 'http://localhost:8080/api',

    /**
     * Token de sessão do usuário
     */
    TOKEN: localStorage.getItem("token"),
};