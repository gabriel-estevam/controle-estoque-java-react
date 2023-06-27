package com.api.estoque.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.Fornecedor;
import com.api.estoque.backend.model.Produto;
import com.api.estoque.backend.model.Estoque;

@Repository
public interface EstoqueRepository extends JpaRepository<Estoque, Long> {
    //public Page<WareHouse> findByProdutoContaining(Produto produto, Pageable page);
    
    @Query(value = "SELECT w.*, p.nome FROM estoque AS w INNER JOIN produto AS p ON w.id_produto = p.id_produto WHERE p.nome LIKE %?%", nativeQuery = true)
    public Page<Estoque> findByProdutoContaining(String nome, Pageable page);

   // public Optional<Estoque> findByProduto(Produto produto);

  //  public Optional<Estoque> findByProdutoAndFornecedorAndIdWareHouseNot(Produto produto, Fornecedor fornecedor, Long id);
}
