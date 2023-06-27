package com.api.estoque.backend.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.api.estoque.backend.model.enums.StatusOption;

@Entity
@Table(name = "material")
public class Material implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name = "idMaterial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMaterial;

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

    public Material() {
        
    }

    public Material(
        Long idMaterial, 
        StatusOption status, 
        Fornecedor fornecedor, 
        Usuario usuario,
        Produto produto,
        Integer quantidadeMinima, 
        Integer quantidadeMaxima, 
        Integer quantidadeIdeal, 
        Integer quantidadeAtual
    ) 
    {
        this.idMaterial = idMaterial;
        this.quantidadeMinima = quantidadeMinima;
        this.quantidadeMaxima = quantidadeMaxima;
        this.quantidadeIdeal = quantidadeIdeal;
        this.quantidadeAtual = quantidadeAtual;
        this.fornecedor = fornecedor;
        this.usuario = usuario;
        this.produto = produto;
        setStatus(status);
    }

    public Long getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(Long idMaterial) {
        this.idMaterial = idMaterial;
    }

    public StatusOption getStatus() {
        return StatusOption.valueOf(status);
    }

    public void setStatus(StatusOption status) {
        if(status != null) {
            this.status = status.getCode();
        }
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
        result = prime * result + ((idMaterial == null) ? 0 : idMaterial.hashCode());
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
        Material other = (Material) obj;
        if (idMaterial == null) {
            if (other.idMaterial != null)
                return false;
        } else if (!idMaterial.equals(other.idMaterial))
            return false;
        return true;
    }
    
}
