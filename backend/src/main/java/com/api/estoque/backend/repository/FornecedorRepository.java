package com.api.estoque.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

import org.springframework.data.domain.Page;

import com.api.estoque.backend.model.Fornecedor;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {

    public Page<Fornecedor> findByNameContaining(String name,  Pageable pageable);

    public Optional<Fornecedor> findByNameAndCnpj(String name, String cnpj);

    public Optional<Fornecedor> findByNameAndCnpjAndIdFornecedorNot(String name, String cnpj, Long idFornecedor);
    
}
