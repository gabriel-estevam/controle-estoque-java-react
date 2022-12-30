package com.api.estoque.backend.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

import com.api.estoque.backend.model.enums.UserRole;

@Entity
@Table(name = "tb_role")
public class RoleModel implements GrantedAuthority, Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long roleId;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private UserRole roleName;

    @Override
    public String getAuthority() {
        return this.roleName.toString();
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public UserRole getRoleName() {
        return roleName;
    }

    public void setRoleName(UserRole roleName) {
        this.roleName = roleName;
    }
}
