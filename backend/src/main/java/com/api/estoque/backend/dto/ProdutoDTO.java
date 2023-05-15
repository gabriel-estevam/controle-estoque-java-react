package com.api.estoque.backend.dto;

import com.api.estoque.backend.model.Produto;
import com.api.estoque.backend.model.UnidadeMedida;
import com.api.estoque.backend.model.enums.StatusOption;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ProdutoDTO {

    private Long idProduto;
    private String nome;
    private Integer status;

    private UnidadeMedida unidadeMedida;

    @JsonProperty("UnidadeMedidaFK")
    private Long unidadeMedidaFK;
    
    public ProdutoDTO() {

    }

    public ProdutoDTO(Produto objProduto) {
        idProduto = objProduto.getIdProduto();
        nome = objProduto.getNome();
        setStatus(objProduto.getStatus());
        unidadeMedida = objProduto.getUnidadeMedida();
    }

    public Long getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Long idProduto) {
        this.idProduto = idProduto;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public StatusOption getStatus() {
        return StatusOption.valueOf(status);
    }

    public void setStatus(StatusOption status) {
        if(status != null) {
            this.status = status.getCode();
        }
    }

    public UnidadeMedida getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(UnidadeMedida unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public Long getUnidadeMedidaFK() {
        return unidadeMedida.getIdUnidadeMedida();
    }

    public void setUnidadeMedidaFK(Long unidadeMedidaFK) {
        this.unidadeMedidaFK = unidadeMedidaFK;
    }

    
}
