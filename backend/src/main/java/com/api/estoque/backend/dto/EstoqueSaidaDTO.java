package com.api.estoque.backend.dto;

import java.time.Instant;

import com.api.estoque.backend.model.EstoqueSaida;
import com.fasterxml.jackson.annotation.JsonProperty;

public class EstoqueSaidaDTO {

    private Long id;
    private Double quantidade;
    private Instant data;

    @JsonProperty("usuarioFK")
    private Long usuarioFK;

    @JsonProperty("filialFK")
    private Long filialFK;
    
    @JsonProperty("estoqueFK")
    private Long estoqueEntradaFK;

    @JsonProperty("produtoFK")
    private Long produtoFK;
    
    @JsonProperty("fornecedorFK")
    private Long fornecedorFK;

    public EstoqueSaidaDTO() {

    }

    public EstoqueSaidaDTO(EstoqueSaida estoqueSaida) {
        id = estoqueSaida.getId();
        quantidade = estoqueSaida.getQuantidade();
        data = estoqueSaida.getData();
        filialFK = estoqueSaida.getFilial().getIdFilial();
        usuarioFK = estoqueSaida.getUsuario().getIdUsuario();
        estoqueEntradaFK = estoqueSaida.getEstoque().getIdEstoque();
        produtoFK = estoqueSaida.getProduto().getIdProduto();
        fornecedorFK = estoqueSaida.getFornecedor().getIdFornecedor();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    public Instant getData() {
        return data;
    }

    public void setData(Instant data) {
        this.data = data;
    }

    public Long getUsuarioFK() {
        return usuarioFK;
    }

    public void setUsuarioFK(Long usuarioFK) {
        this.usuarioFK = usuarioFK;
    }

    public Long getFilialFK() {
        return filialFK;
    }

    public void setFilialFK(Long filialFK) {
        this.filialFK = filialFK;
    }

    public Long getEstoqueEntradaFK() {
        return estoqueEntradaFK;
    }

    public void setEstoqueEntradaFK(Long estoqueEntradaFK) {
        this.estoqueEntradaFK = estoqueEntradaFK;
    }

    public Long getProdutoFK() {
        return produtoFK;
    }

    public void setProdutoFK(Long produtoFK) {
        this.produtoFK = produtoFK;
    }

    public Long getFornecedorFK() {
        return fornecedorFK;
    }

    public void setFornecedorFK(Long fornecedorFK) {
        this.fornecedorFK = fornecedorFK;
    }

}