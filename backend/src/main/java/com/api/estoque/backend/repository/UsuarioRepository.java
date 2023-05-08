package com.api.estoque.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import com.api.estoque.backend.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    public Optional<Usuario> findByEmail(String email);

    public Optional<Usuario> findByEmailAndIdUsuarioNot(String email, Long idUsuario);

    public Page<Usuario> findByNameContaining(String name,  Pageable pageable);
}
