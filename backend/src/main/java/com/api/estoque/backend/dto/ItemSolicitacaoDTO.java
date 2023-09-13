package com.api.estoque.backend.dto;

import com.api.estoque.backend.model.ItemSolicitacao;
import com.api.estoque.backend.model.Produto;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ItemSolicitacaoDTO {

    private Produto produto;

    @JsonProperty("produtoFK")
    private Long produtoFK;
    
    private Double quantidade;
    private String observacao;

    public ItemSolicitacaoDTO() {

    }

    public ItemSolicitacaoDTO(ItemSolicitacao objItemSolicitacao) {
        quantidade = objItemSolicitacao.getQuantidade();
        observacao = objItemSolicitacao.getObservacao();
        produto = objItemSolicitacao.getProduto();
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Long getProdutoFK() {
        return produtoFK;
    }

    public void setProdutoFK(Long produtoFK) {
        this.produtoFK = produtoFK;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
    
}
