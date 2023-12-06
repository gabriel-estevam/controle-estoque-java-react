import { Environment } from '../../../environment';
const exportPDF = (rpt, idFilial) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${Environment.URL_BASE}/report/pdf?rpt=${rpt}&idFilial=${idFilial}`);
    xhr.setRequestHeader("Authorization", `Bearer ${Environment.TOKEN}`);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function (e) {
        if (this.status === 200) {
            var blob = new Blob([this.response], { type: "application/pdf" });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "Produtos.pdf";
            link.click();
        }
    };
    xhr.send();
};
export const Relatorios = {
    exportPDF,
};
