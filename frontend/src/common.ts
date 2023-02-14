const server = 'http://localhost:8080';
let  titleMsg : String;
let  msg : String;

function showError(error : any) {
    if(error.response && error.response.data) {
        titleMsg = JSON.stringify(error.response.data.error).toString().replace(/"/g, "")
        msg = JSON.stringify(error.response.data.message).toString().replace(/"/g, "")
        /*alert(`${JSON.stringify(error.response.data.error).toString().replace(/"/g, "")}`+
        `\n${JSON.stringify(error.response.data.message).toString().replace(/"/g, "")}`) */
        alert(`${titleMsg}\n${msg}`);
    }
    else {
        titleMsg = "NetWork Error!"
        msg = "Erro ao tentar conectar no Servidor! Entre em contato com o Administrador."
        //alert("Network Error!\nErro ao tentar conectar no Servidor! Entre em contato com o Administrador!");
        alert(`${titleMsg}\n${msg}`);
    }

}

function showSucces(msg : any) {
    alert('Sucesso ' +  JSON.stringify(msg).toString().replace(/"/g, ""));
}

export { server, showError, showSucces };