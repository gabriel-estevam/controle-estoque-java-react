package com.api.estoque.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.api.estoque.backend.model.ItemEstoqueEntrada;

@Repository
public interface ItemEstoqueEntradaRepository extends JpaRepository<ItemEstoqueEntrada, Long> {
    public Page<ItemEstoqueEntrada> findByProdutoNomeContaining(String nome, Pageable pageable);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(
        value = 
        "UPDATE item_estoque_entrada \r\n" + //
        "\tSET quantidade_atual = :quantidade\r\n" + //
        "WHERE id_produto = :idProduto \r\n",
        nativeQuery = true
    )
    public void update(
        @Param("quantidade") Double quantidade,
        @Param("idProduto") Long idProduto
    );
}
