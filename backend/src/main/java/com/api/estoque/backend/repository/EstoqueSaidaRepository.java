package com.api.estoque.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.EstoqueSaida;
import java.util.Optional;


@Repository
public interface EstoqueSaidaRepository extends JpaRepository<EstoqueSaida, Long> {
    public Optional<EstoqueSaida> findByEstoque_idEstoqueAndProduto_idProdutoAndFornecedor_idFornecedor(Long estoque, Long produto, Long fornecedor);
}
