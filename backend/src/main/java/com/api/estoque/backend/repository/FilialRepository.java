package com.api.estoque.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.model.Usuario;

@Repository
public interface FilialRepository extends JpaRepository<Filial, Long> {
    public Optional<Filial>findByCnpj(String cnpj);

    public Page<Filial>findByNameContaining(String name,  Pageable pageable);

    public Optional<Filial> findByCnpjAndIdFilialNot(String cnpj, Long id);

    public Optional<Filial>findByUsuario(Usuario usuario);
}
