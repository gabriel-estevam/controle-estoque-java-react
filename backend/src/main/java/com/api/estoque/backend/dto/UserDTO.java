package com.api.estoque.backend.dto;

import java.io.Serializable;

import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.model.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.api.estoque.backend.model.enums.StatusOption;

public class UserDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long IdUsuario;
    private String name;
    private String email;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    
    private Integer role;
    private Integer status;
    
    @JsonProperty("filialFK")
    private String filialFK;
    
    private Filial filial;
  
    public UserDTO() {

    }

    public UserDTO(Usuario objUsuario) {
        IdUsuario = objUsuario.getIdUsuario();
        name = objUsuario.getName();
        email = objUsuario.getEmail();
        password = objUsuario.getPassword();
        filial = objUsuario.getFilial();
        setRole(objUsuario.getRole());
        setStatus(objUsuario.getStatus());
    }
    
    public Long getIdUsuario() {
        return IdUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.IdUsuario = idUsuario;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public UserRole getRole() {
        return UserRole.valueOf(role);
    }

    public void setRole(UserRole UserRole) {
        if (UserRole != null) {
            this.role = UserRole.getCode();
        }
    }

    public StatusOption getStatus() {
        return StatusOption.valueOf(status);
    }

    public void setStatus(StatusOption UserStatus) {
        if (UserStatus != null) {
            this.status = UserStatus.getCode();
        }
    }
    
    public String getFilialFK() {
        return filialFK;
    }

    public void setFilialFK(String filialFK) {
        this.filialFK = filialFK;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }

}
