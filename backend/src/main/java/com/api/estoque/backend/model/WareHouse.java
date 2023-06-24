package com.api.estoque.backend.model;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.api.estoque.backend.model.enums.StatusOption;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "warehouse")
public class WareHouse implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name = "idWareHouse")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idWareHouse;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataEntrada;
    
    private Integer status;
    
    private Integer quantidadeMinima;
    private Integer quantidadeMaxima;
    private Integer quantidadeIdeal;
    private Integer quantidadeAtual;
    
    @OneToOne
    @JoinColumn(name = "idFornecedor")
    private Fornecedor fornecedor;
    
    @OneToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;
    
    @OneToOne
    @JoinColumn(name = "idProduto")
    private Produto produto;

    public WareHouse() {
        
    }

    public WareHouse(
        Long idWareHouse, 
        StatusOption status, 
        Instant dataEntrada, 
        Fornecedor fornecedor, 
        Usuario usuario,
        Produto produto,
        Integer quantidadeMinima, 
        Integer quantidadeMaxima, 
        Integer quantidadeIdeal, 
        Integer quantidadeAtual
    ) 
    {
        this.idWareHouse = idWareHouse;
        this.dataEntrada = dataEntrada;
        this.quantidadeMinima = quantidadeMinima;
        this.quantidadeMaxima = quantidadeMaxima;
        this.quantidadeIdeal = quantidadeIdeal;
        this.quantidadeAtual = quantidadeAtual;
        this.fornecedor = fornecedor;
        this.usuario = usuario;
        this.produto = produto;
        setStatus(status);
    }

    public Long getIdWareHouse() {
        return idWareHouse;
    }

    public void setIdWareHouse(Long idWareHouse) {
        this.idWareHouse = idWareHouse;
    }

    public StatusOption getStatus() {
        return StatusOption.valueOf(status);
    }

    public void setStatus(StatusOption status) {
        if(status != null) {
            this.status = status.getCode();
        }
    }

   // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", timezone = "GMT")
    public Instant getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(Instant dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Integer getQuantidadeMinima() {
        return quantidadeMinima;
    }

    public void setQuantidadeMinima(Integer quantidadeMinima) {
        this.quantidadeMinima = quantidadeMinima;
    }

    public Integer getQuantidadeMaxima() {
        return quantidadeMaxima;
    }

    public void setQuantidadeMaxima(Integer quantidadeMaxima) {
        this.quantidadeMaxima = quantidadeMaxima;
    }

    public Integer getQuantidadeIdeal() {
        return quantidadeIdeal;
    }

    public void setQuantidadeIdeal(Integer quantidadeIdeal) {
        this.quantidadeIdeal = quantidadeIdeal;
    }

    public Integer getQuantidadeAtual() {
        return quantidadeAtual;
    }

    public void setQuantidadeAtual(Integer quantidadeAtual) {
        this.quantidadeAtual = quantidadeAtual;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((idWareHouse == null) ? 0 : idWareHouse.hashCode());
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
        WareHouse other = (WareHouse) obj;
        if (idWareHouse == null) {
            if (other.idWareHouse != null)
                return false;
        } else if (!idWareHouse.equals(other.idWareHouse))
            return false;
        return true;
    }
    
}
