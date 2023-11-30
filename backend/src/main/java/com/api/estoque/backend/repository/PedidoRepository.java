package com.api.estoque.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    public Page<Pedido> findByNotaEntradaAndFilial_idFilial(Long notaEntrada, Long filial, Pageable pageable);
    public Page<Pedido> findByFilial_idFilial(Long filial, Pageable pageable);
}
