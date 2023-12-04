package com.api.estoque.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.Recebimento;

@Repository
public interface RecebimentoRepository extends JpaRepository<Recebimento, Long> {
    public Page<Recebimento> findBySolicitacao_NumeroSolAndFilial_idFilial(Long numeroSol, Long filial,Pageable pageable);
    public Page<Recebimento> findByFilial_idFilial(Long filial, Pageable pageable);
}
