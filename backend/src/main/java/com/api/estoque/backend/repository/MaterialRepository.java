package com.api.estoque.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.Fornecedor;
import com.api.estoque.backend.model.Produto;
import com.api.estoque.backend.model.Material;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {  
  @Query(value = "SELECT m.*, p.nome FROM material AS m INNER JOIN produto AS p ON m.id_produto = p.id_produto WHERE p.nome LIKE %?%", nativeQuery = true)
  public Page<Material> findByProdutoContaining(String nome, Pageable page);

  public Optional<Material> findByProduto(Produto produto);

  public Optional<Material> findByProdutoAndFornecedorAndIdMaterialNot(Produto produto, Fornecedor fornecedor, Long idMaterial);

  /*@Query(
    value =  
    "SELECT W.* "+
    "FROM warehouse AS w "+
    "INNER JOIN usuario AS u ON w.id_usuario = u.id_usuario "+
    "INNER JOIN filial AS  f ON u.id_filial  = f.id_filial "+
    "WHERE f.id_filial = ? ", 
    nativeQuery = true
  )
  public Optional<Material> findAllByIdFilial(Long idFilial);
*/
}
