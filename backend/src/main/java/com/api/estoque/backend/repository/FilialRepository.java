package com.api.estoque.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.Filial;

@Repository
public interface FilialRepository extends JpaRepository<Filial, Long> {
    public Optional<Filial>findByCnpj(String cnpj);
}
