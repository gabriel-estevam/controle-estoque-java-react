package com.api.estoque.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.EstoqueEntrada;
@Repository
public interface EstoqueEntradaRepository extends JpaRepository<EstoqueEntrada, Long> {
    public Page<EstoqueEntrada> findByItensEstoque_id_produto_nomeContaining(String nome, Pageable pageable);
    //public Optional<EstoqueEntrada> findByItensEstoque_id_produtoAndItensEstoque_fornecedor(Long produto, Long fornecedor);
    public Optional<EstoqueEntrada> findByItensEstoque_id_produto_idProdutoAndItensEstoque_fornecedor_idFornecedor(Long produto, Long fornecedor);
    //public Optional<EstoqueEntrada> findByItensEstoque_id_produtoAndItensEstoque_fornecedorAndIdEstoqueNot(Long produto, Long fornecedor, Long estoque);
    public Optional<EstoqueEntrada> findByItensEstoque_id_produto_idProdutoAndItensEstoque_fornecedor_idFornecedorAndIdEstoqueNot(Long produto, Long fornecedor, Long estoque);
    
}
