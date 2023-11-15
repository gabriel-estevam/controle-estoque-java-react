package com.api.estoque.backend.model;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "estoque_saida")
public class EstoqueSaida implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double quantidade;
    private Instant data;

    @OneToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;
    
    @OneToOne
    @JoinColumn(name = "idFilial")
    private Filial filial;
    
    @OneToOne
    @JoinColumn(name = "idEstoque")
    private EstoqueEntrada estoque;

    @OneToOne
    @JoinColumn(name = "idProduto")
    private Produto produto;

    @OneToOne
    @JoinColumn(name = "idFornecedor")
    private Fornecedor fornecedor;

    public EstoqueSaida() {

    }

    public EstoqueSaida(
        Long id, 
        Double quantidade, 
        Instant data, 
        Usuario usuario, 
        Filial filial,
        EstoqueEntrada estoque,
        Produto produto,
        Fornecedor fornecedor
    ) {
        this.id = id;
        this.quantidade = quantidade;
        this.data = data;
        this.usuario = usuario;
        this.filial = filial;
        this.estoque = estoque;
        this.produto = produto;
        this.fornecedor = fornecedor;
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

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }

    public EstoqueEntrada getEstoque() {
        return estoque;
    }

    public void setEstoque(EstoqueEntrada estoque) {
        this.estoque = estoque;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }

}