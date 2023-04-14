package com.api.estoque.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.Endereco;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
    
    @Query(value = "SELECT COUNT(*) FROM endereco WHERE cep= ?1", nativeQuery = true)
    public Integer findByCepAndEstado(String cep);

    @Query(value = "SELECT e.* FROM endereco AS e INNER JOIN filial AS f ON e.id_filial = f.id_filial WHERE e.id_filial = ?1", nativeQuery = true)
    public Optional<Endereco> findById(Long id);
}
