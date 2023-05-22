package com.api.estoque.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.Endereco;
import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.model.Fornecedor;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
  
  public Optional<Endereco> findByCepAndEstadoAndLogradouroAndNumeroAndComplementoAndCidade(String cep, String estado, String logradouro, String numero, String complemento, String cidade);

  public Optional<Endereco> findByCepAndEstadoAndLogradouroAndNumeroAndComplementoAndCidadeAndFilialNot(String cep, String estado, String logradouro, String numero, String complemento, String cidade, Filial filial);
  
  public Optional<Endereco> findByCepAndEstadoAndLogradouroAndNumeroAndComplementoAndCidadeAndFornecedorNot(String cep, String estado, String logradouro, String numero, String complemento, String cidade, Fornecedor fornecedor);
  
}
