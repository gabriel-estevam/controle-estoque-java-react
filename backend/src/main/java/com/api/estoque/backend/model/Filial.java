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
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "filial")
public class Filial implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name = "idFilial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFilial;

    private String name;

    @Column(name = "phoneNumber")
    private String phoneNumber;
    
    private String cnpj;

    
    
    @Column(name = "status")
    private Integer status;
    
    @OneToOne //(cascade = CascadeType.ALL)
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;
    
    @OneToOne
    @JoinColumn(name = "idEndereco")
    private Endereco endereco;

    public Filial() {

    }

    public Filial(Long idFilial, String name, String phoneNumber, String cnpj, StatusOption status, Endereco endereco) {
        this.idFilial = idFilial;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.cnpj = cnpj;
        this.endereco = endereco;
     //   this.usuario = usuario;
        setStatus(status);
    }

    public Long getIdFilial() {
        return idFilial;
    }

    public void setIdFilial(Long idFilial) {
        this.idFilial = idFilial;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public StatusOption getStatus() {
        return StatusOption.valueOf(status);
    }

    public void setStatus(StatusOption status) {
        if(status != null) {
            this.status = status.getCode();
        }
    }
    
    @JsonIgnore
    public Usuario getUsuario() {
        return usuario;
    }

    public Long getUsuarioFK() {
        return usuario.getIdUsuario();
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((idFilial == null) ? 0 : idFilial.hashCode());
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
        Filial other = (Filial) obj;
        if (idFilial == null) {
            if (other.idFilial != null)
                return false;
        } else if (!idFilial.equals(other.idFilial))
            return false;
        return true;
    }
        
}
