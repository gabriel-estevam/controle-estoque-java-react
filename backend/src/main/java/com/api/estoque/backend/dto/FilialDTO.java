package com.api.estoque.backend.dto;

import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.model.enums.StatusOption;

public class FilialDTO {
    
    private Long id;
    private String name;
    private String phoneNumber;
    private String cnpj;
    private Integer statusFilial;

    public FilialDTO() {

    }

    public FilialDTO(Filial objFilial) {
        id = objFilial.getIdFilial();
        name = objFilial.getName();
        cnpj = objFilial.getCnpj();
        phoneNumber = objFilial.getPhoneNumber();
        setStatusFilial(objFilial.getStatusFilial());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public StatusOption getStatusFilial() {
        return StatusOption.valueOf(statusFilial);
    }

    public void setStatusFilial(StatusOption statusFilial) {
        if(statusFilial != null) {
            this.statusFilial = statusFilial.getCode();
        }
    }
    
}
