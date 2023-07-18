package com.api.estoque.backend.dto;

import com.api.estoque.backend.model.Fornecedor;
import com.api.estoque.backend.model.ItemEstoqueEntrada;
import com.api.estoque.backend.model.Produto;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ItemEstoqueEntradaDTO {

    private Double quantidadeAtual;
    private Double quantidadeIdeal;
    private Double quantidadeMinima;
    private Double quantidadeMaxima;
    private Fornecedor fornecedor;
    
    @JsonProperty("fornecedorFK")
    private Long fornecedorFK;
    
    private Produto produto;

    @JsonProperty("produtoFK")
    private Long produtoFK;

    public ItemEstoqueEntradaDTO() {

    }

    public ItemEstoqueEntradaDTO(ItemEstoqueEntrada objItemEstoqueEntrada) {
        quantidadeAtual = objItemEstoqueEntrada.getQuantidadeAtual();
        quantidadeIdeal = objItemEstoqueEntrada.getQuantidadeIdeal();
        quantidadeMinima = objItemEstoqueEntrada.getQuantidadeMinima();
        quantidadeMaxima = objItemEstoqueEntrada.getQuantidadeMaxima();
        produto = objItemEstoqueEntrada.getProduto();
        fornecedor = objItemEstoqueEntrada.getFornecedor();
    }

    public Double getQuantidadeAtual() {
        return quantidadeAtual;
    }

    public void setQuantidadeAtual(Double quantidadeAtual) {
        this.quantidadeAtual = quantidadeAtual;
    }

    public Double getQuantidadeIdeal() {
        return quantidadeIdeal;
    }

    public void setQuantidadeIdeal(Double quantidadeIdeal) {
        this.quantidadeIdeal = quantidadeIdeal;
    }

    public Double getQuantidadeMinima() {
        return quantidadeMinima;
    }

    public void setQuantidadeMinima(Double quantidadeMinima) {
        this.quantidadeMinima = quantidadeMinima;
    }

    public Double getQuantidadeMaxima() {
        return quantidadeMaxima;
    }

    public void setQuantidadeMaxima(Double quantidadeMaxima) {
        this.quantidadeMaxima = quantidadeMaxima;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }
    
    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Long getFornecedorFK() {
        return fornecedorFK;
    }

    public void setFornecedorFK(Long fornecedorFK) {
        this.fornecedorFK = fornecedorFK;
    }

    public Long getProdutoFK() {
        return produtoFK;
    }

    public void setProdutoFK(Long produtoFK) {
        this.produtoFK = produtoFK;
    }
    
}
