package com.api.estoque.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.Endereco;
import com.api.estoque.backend.model.Filial;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
    
    
    public Optional<Endereco> findByCepAndEstadoAndLogradouroAndNumeroAndComplemento(String cep, String estado, String logradouro, String numero, String complemento);
    
    public Optional<Endereco> findByCepAndEstadoAndLogradouroAndNumeroAndComplementoAndFilialNot(String cep, String estado, String logradouro, String numero, String complemento, Filial filial);
    
    public Optional<Endereco> findByFilial(Filial filial);
    
  // @Query(value = "SELECT e.* FROM endereco AS e INNER JOIN filial AS f ON e.id_filial = f.id_filial WHERE e.id_filial = ?1", nativeQuery = true)
   // public Optional<Endereco> findById(Long id);
}
