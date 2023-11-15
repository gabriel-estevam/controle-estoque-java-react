package com.api.estoque.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.estoque.backend.model.Solicitacao;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {
    public Page<Solicitacao> findByNumeroSolAndFilial_idFilial(Long numeroSol, Long filial,Pageable pageable);
    public Page<Solicitacao> findByFilial_idFilial(Long filial, Pageable pageable);
}
