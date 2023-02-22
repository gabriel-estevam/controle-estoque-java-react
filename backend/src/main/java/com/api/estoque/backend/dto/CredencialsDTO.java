package com.api.estoque.backend.dto;

import java.io.Serializable;

public class CredencialsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String email;
    private String password;

    public CredencialsDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public CredencialsDTO() {

    }
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}
