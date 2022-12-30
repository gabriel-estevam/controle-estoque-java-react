package com.api.estoque.backend.dto;

import java.io.Serializable;

import com.api.estoque.backend.model.UserModel;
import com.api.estoque.backend.model.enums.UserRole;
import com.api.estoque.backend.model.enums.UserStatus;

public class UserDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String name;
    private String email;
    private String password;
    private Integer role;
    private Integer status;

    public UserDTO() {
    }

    public UserDTO(UserModel objUsuario) {
        id = objUsuario.getId();
        name = objUsuario.getName();
        email = objUsuario.getEmail();
        password = objUsuario.getPassword();
        setRole(objUsuario.getRole());
        setStatus(objUsuario.getStatus());
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

    public UserStatus getStatus() {
        return UserStatus.valueOf(status);
    }

    public void setStatus(UserStatus UserStatus) {
        if (UserStatus != null) {
            this.status = UserStatus.getCode();
        }
    }
}
