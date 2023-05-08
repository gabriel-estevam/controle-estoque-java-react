package com.api.estoque.backend.dto;

import com.api.estoque.backend.model.Endereco;
import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.model.enums.StatusOption;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class FilialDTO {
    
    private Long idFilial;
    private String name;
    private String phoneNumber;
    
    
    
    private String cnpj;
    private Integer status;
    
    @JsonProperty("usuarioFK")
    private String usuarioFK;
    
    @JsonProperty("Endereco")
    private Endereco endereco;

    public FilialDTO() {

    }

    public FilialDTO(Filial objFilial) {
        idFilial = objFilial.getIdFilial();
        name = objFilial.getName();
        cnpj = objFilial.getCnpj();
        phoneNumber = objFilial.getPhoneNumber();
        endereco = objFilial.getEndereco();
        setStatus(objFilial.getStatus());
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
    
    public String getUsuarioFK() {
        return usuarioFK;
    }

    public void setUsuarioFK(String usuarioFK) {
        this.usuarioFK = usuarioFK;
    }

    @JsonIgnore
    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }
}
