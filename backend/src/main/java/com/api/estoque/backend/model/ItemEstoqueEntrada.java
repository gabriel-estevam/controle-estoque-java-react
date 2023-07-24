package com.api.estoque.backend.model;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.api.estoque.backend.model.PK.ItemEstoqueEntradaPK;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "item_estoque_entrada")
public class ItemEstoqueEntrada implements Serializable {
    private static final long serialVersionUID = 1L;

    private Double quantidadeAtual;
    private Double quantidadeIdeal;
    private Double quantidadeMinima;
    private Double quantidadeMaxima;

    @EmbeddedId
    private ItemEstoqueEntradaPK id = new ItemEstoqueEntradaPK();

    @OneToOne
    @JoinColumn(name = "idFornecedor")
    private Fornecedor fornecedor;

    public ItemEstoqueEntrada() {

    }

    public ItemEstoqueEntrada(
        Produto produto,
        EstoqueEntrada estoqueEntrada,
        Fornecedor fornecedor,
        Double quantidadeAtual, 
        Double quantidadeIdeal, 
        Double quantidadeMinima, 
        Double quantidadeMaxima
    ) 
    {
        super();
        id.setProduto(produto);
        id.setEstoque(estoqueEntrada);
        this.fornecedor = fornecedor;
        this.quantidadeAtual = quantidadeAtual;
        this.quantidadeIdeal = quantidadeIdeal;
        this.quantidadeMinima = quantidadeMinima;
        this.quantidadeMaxima = quantidadeMaxima;
    }

    @JsonIgnore
    public EstoqueEntrada getEstoqueEntrada() {
        return id.getEstoque();
    }

    public void setEstoqueEntrada(EstoqueEntrada estoqueEntrada) {
        id.setEstoque(estoqueEntrada);
    }

    public Produto getProduto() {
        return id.getProduto();
    }

    public void setProduto(Produto produto) {
        id.setProduto(produto);
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

    @JsonIgnore
    public ItemEstoqueEntradaPK getId() {
        return id;
    }

    public void setId(ItemEstoqueEntradaPK id) {
        this.id = id;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ItemEstoqueEntrada other = (ItemEstoqueEntrada) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

}