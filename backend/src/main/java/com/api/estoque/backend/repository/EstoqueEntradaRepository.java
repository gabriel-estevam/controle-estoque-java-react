package com.api.estoque.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.EstoqueEntrada;
@Repository
public interface EstoqueEntradaRepository extends JpaRepository<EstoqueEntrada, Long> {
    public Page<EstoqueEntrada> findByFilial_idFilialAndItensEstoque_id_produto_nomeContaining(Long filial, String nome, Pageable pageable);
    public Optional<EstoqueEntrada> findByFilial_idFilialAndItensEstoque_id_produto_idProduto(Long filial, Long produto);    
}
