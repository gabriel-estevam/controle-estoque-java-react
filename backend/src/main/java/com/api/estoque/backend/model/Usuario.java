package com.api.estoque.backend.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.api.estoque.backend.model.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.api.estoque.backend.model.enums.StatusOption;

@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "idUsuario")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO-INCREMENT no banco de dados
    private Long idUsuario;
    private String name;
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    
    private Integer role;
    private Integer status;

//(cascade = CascadeType.ALL)

   @OneToOne 
   @JoinColumn(name = "idFilial", insertable = true, updatable = true)
   private Filial filial; //filial do usuario

    public Usuario() {

    }

    public Usuario(Long idUsuario, String name, String email, String password, UserRole role, StatusOption status) {
        this.idUsuario = idUsuario;
        this.name = name;
        this.email = email;
        this.password = password;
        setRole(role);
        setStatus(status);
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
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

    public StatusOption getStatus() {
        return StatusOption.valueOf(status);
    }

    public void setStatus(StatusOption userStatus) {
        if (userStatus != null) {
            this.status = userStatus.getCode();
        }
    }
    
    @JsonIgnore
    public Filial getFilial() {
        return filial;
    }

    public String getFilialName() {
        return filial.getName();
    }
    
    public Long getFilialFK() {
        return filial.getIdFilial();
    }
    
    public void setFilial(Filial filial) {
        this.filial = filial;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((idUsuario == null) ? 0 : idUsuario.hashCode());
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
        Usuario other = (Usuario) obj;
        if (idUsuario == null) {
            if (other.idUsuario != null)
                return true;
        } else if (!idUsuario.equals(other.idUsuario))
            return true;
        return true;
    }

}
