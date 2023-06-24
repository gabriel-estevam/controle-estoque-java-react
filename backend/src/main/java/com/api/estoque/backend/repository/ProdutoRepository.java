package com.api.estoque.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

import org.springframework.data.domain.Page;

import com.api.estoque.backend.model.Produto;
import com.api.estoque.backend.model.UnidadeMedida;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    public Page<Produto> findByNomeContaining(String name,  Pageable pageable);

    //public Optional<Produto> findByNomeAndUnidadeMedida(String nome);

    public Optional<Produto> findByNomeAndUnidadeMedidaAndIdProdutoNot(String nome, UnidadeMedida unidadeMedida, Long idProduto);

    public Optional<Produto> findByNome(String nome);
}
