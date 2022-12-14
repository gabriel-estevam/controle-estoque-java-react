package com.api.estoque.backend.model;

import java.io.Serializable;

import com.api.estoque.backend.model.enums.UsuarioStatus;
import com.api.estoque.backend.model.enums.UsuarioTipo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO-INCREMENT no banco de dados
    private Long id;

    private String nome;
    private String email;
    private String senha;
    private Integer tipo;
    private Integer status;

    public Usuario() {

    }

    public Usuario(Long id, String nome, String email, String senha, UsuarioTipo tipo, UsuarioStatus status) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        setTipo(tipo);
        setStatus(status);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public UsuarioTipo getTipo() {
        return UsuarioTipo.valueOf(tipo);
    }

    public void setTipo(UsuarioTipo usuarioTipo) {
        if (usuarioTipo != null) {
            this.tipo = usuarioTipo.getCode();
        }
    }

    public UsuarioStatus getStatus() {
        return UsuarioStatus.valueOf(status);
    }

    public void setStatus(UsuarioStatus usuarioStatus) {
        if (usuarioStatus != null) {
            this.status = usuarioStatus.getCode();
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
            return false;
        if (getClass() != obj.getClass())
            return false;
        Usuario other = (Usuario) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
