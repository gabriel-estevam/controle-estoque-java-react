package com.api.estoque.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.ItemEstoqueEntrada;

@Repository
public interface ItemEstoqueEntradaRepository extends JpaRepository<ItemEstoqueEntrada, Long> {
    public Page<ItemEstoqueEntrada> findByProdutoNomeContaining(String nome, Pageable pageable);
}
