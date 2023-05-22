package com.api.estoque.backend.dto;

import com.api.estoque.backend.model.Endereco;
import com.api.estoque.backend.model.Fornecedor;
import com.api.estoque.backend.model.enums.StatusOption;
import com.fasterxml.jackson.annotation.JsonProperty;

public class FornecedorDTO {
    private Long idFornecedor;

    private String name;
    private String cnpj;
    private String email;
    private String phoneNumber;
    private Integer status;
    
    @JsonProperty("Endereco")
    private Endereco endereco;
    
    public FornecedorDTO() {

    }

    public FornecedorDTO(Fornecedor objFornecedor) {
        idFornecedor = objFornecedor.getIdFornecedor();
        name = objFornecedor.getName();
        cnpj = objFornecedor.getCnpj();
        email = objFornecedor.getEmail();
        phoneNumber = objFornecedor.getPhoneNumber();
        setStatus(objFornecedor.getStatus());
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

}
