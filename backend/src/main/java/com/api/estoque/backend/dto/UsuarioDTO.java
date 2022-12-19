package com.api.estoque.backend.dto;

import java.io.Serializable;

import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.model.enums.UsuarioStatus;
import com.api.estoque.backend.model.enums.UsuarioTipo;

public class UsuarioDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String nome;
    private String email;
    private String senha;
    private Integer tipo;
    private Integer status;

    public UsuarioDTO() {
    }

    public UsuarioDTO(Usuario objUsuario) {
        id = objUsuario.getId();
        nome = objUsuario.getNome();
        email = objUsuario.getEmail();
        senha = objUsuario.getSenha();
        setTipo(objUsuario.getTipo());
        setStatus(objUsuario.getStatus());
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
}