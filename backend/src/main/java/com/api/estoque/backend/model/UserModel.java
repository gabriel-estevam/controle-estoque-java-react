package com.api.estoque.backend.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.api.estoque.backend.model.enums.UserRole;
import com.api.estoque.backend.model.enums.UserStatus;

@Entity
@Table(name = "tb_user")
public class UserModel implements UserDetails, Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO-INCREMENT no banco de dados
    private Long id;

    private String name;
    private String email;
    private String password;
    private Integer role;
    private Integer status;

    @ManyToMany
    @JoinTable(name = "TB_USERS_ROLES", joinColumns = @JoinColumn(name = "id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<RoleModel> roles;

    public UserModel() {

    }

    public UserModel(Long id, String name, String email, String password, UserRole role, UserStatus status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        setRole(role);
        setStatus(status);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return this.roles;
    }

    @Override
    public String getUsername() {

        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override
    public boolean isEnabled() {

        return true;
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

    public void setRole(UserRole userRole) {
        if (userRole != null) {
            this.role = userRole.getCode();
        }
    }

    public UserStatus getStatus() {
        return UserStatus.valueOf(status);
    }

    public void setStatus(UserStatus userStatus) {
        if (userStatus != null) {
            this.status = userStatus.getCode();
        }
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return true;
        if (getClass() != obj.getClass())
            return true;
        UserModel other = (UserModel) obj;
        if (id == null) {
            if (other.id != null)
                return true;
        } else if (!id.equals(other.id))
            return true;
        return true;
    }

}
