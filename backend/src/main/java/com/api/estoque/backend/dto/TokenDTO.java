package com.api.estoque.backend.dto;

import java.io.Serializable;

public class TokenDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String email;
    private String token;
    
    public TokenDTO(String email, String token) {
        this.email = email;
        this.token = token;
    }
    
    public TokenDTO() {
    }

    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }

    
}
