package com.api.estoque.backend.model;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "estoque")
public class Estoque implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name = "idEstoque")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEstoque;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant dataEntrada;

    @OneToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @OneToMany(mappedBy = "id.estoque")
    private Set<ItemEstoque> itensEstoque = new HashSet<>();

    public Estoque() {
        
    }

    public Estoque(
        Long idEstoque, 
        Instant dataEntrada, 
        Fornecedor fornecedor, 
        Usuario usuario
    ) 
    {
        this.idEstoque = idEstoque;
        this.dataEntrada = dataEntrada;
        this.usuario = usuario;
    }

    public Long getIdEstoque() {
        return idEstoque;
    }

    public void setIdEstoque(Long idEstoque) {
        this.idEstoque = idEstoque;
    }

   // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", timezone = "GMT")
    public Instant getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(Instant dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public Set<ItemEstoque> getItenEstoque() {
        return itensEstoque;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((idEstoque == null) ? 0 : idEstoque.hashCode());
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
        Estoque other = (Estoque) obj;
        if (idEstoque == null) {
            if (other.idEstoque != null)
                return false;
        } else if (!idEstoque.equals(other.idEstoque))
            return false;
        return true;
    }
    
}
