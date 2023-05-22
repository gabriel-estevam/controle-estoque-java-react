package com.api.estoque.backend.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
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
@Table(name = "fornecedor")
public class Fornecedor  implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "idFornecedor")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFornecedor;

    private String name;
    private String cnpj;
    private String email;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    private Integer status;

    @OneToOne(cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    @JoinColumn(name = "idEndereco", insertable = true, updatable = true)
    private Endereco endereco;

    public Fornecedor() {

    }

    public Fornecedor(Long idFornecedor, String name, String cnpj, String email, String phoneNumber, StatusOption status, Endereco endereco) {
        this.idFornecedor = idFornecedor;
        this.name = name;
        this.cnpj = cnpj;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.endereco = endereco;
        setStatus(status);
    }

    public Long getIdFornecedor() {
        return idFornecedor;
    }

    public void setIdFornecedor(Long idFornecedor) {
        this.idFornecedor = idFornecedor;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public StatusOption getStatus() {
        return StatusOption.valueOf(status);
    }

    public void setStatus(StatusOption status) {
        if(status != null) {
            this.status = status.getCode();
        }
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
        result = prime * result + ((idFornecedor == null) ? 0 : idFornecedor.hashCode());
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
        Fornecedor other = (Fornecedor) obj;
        if (idFornecedor == null) {
            if (other.idFornecedor != null)
                return false;
        } else if (!idFornecedor.equals(other.idFornecedor))
            return false;
        return true;
    }
    
}
