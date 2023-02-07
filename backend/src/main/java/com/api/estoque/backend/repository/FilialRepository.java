package com.api.estoque.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.Filial;

@Repository
public interface FilialRepository extends JpaRepository<Filial, Long>{
    
}
