package com.api.estoque.backend.dto;

import com.api.estoque.backend.model.ItemPedido;
import com.api.estoque.backend.model.Produto;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ItemPedidoDTO {
    private Produto produto;

    @JsonProperty("produtoFK")
    private Long produtoFK;

    private Double quantidade;
    private Double valorUnitario;
    private Double valorTotal;

    public ItemPedidoDTO() {

    }

    public ItemPedidoDTO(ItemPedido objItemPedido) {
        produto = objItemPedido.getProduto();
        quantidade = objItemPedido.getQuantidade();
        valorUnitario = objItemPedido.getValorUnitario();
        valorTotal = objItemPedido.getValorTotal();
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

    public Double getValorUnitario() {
        return valorUnitario;
    }

    public void setValorUnitario(Double valorUnitario) {
        this.valorUnitario = valorUnitario;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }
}