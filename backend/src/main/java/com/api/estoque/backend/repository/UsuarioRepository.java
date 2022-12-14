package com.api.estoque.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.estoque.backend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
