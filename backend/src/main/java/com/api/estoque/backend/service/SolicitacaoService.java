package com.api.estoque.backend.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.dto.SolicitacaoDTO;
import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.model.ItemSolicitacao;
import com.api.estoque.backend.model.Solicitacao;
import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.model.enums.PedidoStatusOption;
import com.api.estoque.backend.repository.ItemSolicitacaoRepository;
import com.api.estoque.backend.repository.SolicitacaoRepository;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
public class SolicitacaoService {
    
    @Autowired
    private SolicitacaoRepository repository;

    @Autowired
    private ItemSolicitacaoRepository itemRepository;

    @Autowired
    private FilialService filialService;

    @Autowired
    private UserService usuarioService;

    public Page<Solicitacao> findByNumeroSol(Long numeroSol, Long filial, Pageable pageable) {
        return repository.findByNumeroSolAndFilial_idFilial(numeroSol, filial,pageable);
    }

    public Page<Solicitacao> findByFilial(Long filial, Pageable pageable) {
        return repository.findByFilial_idFilial(filial, pageable);
    }

    public List<Solicitacao> findAll() {
        return repository.findAll();
    }

    
    public Solicitacao findById(Long id) {
        Optional<Solicitacao> solicitacao = repository.findById(id);
        return solicitacao.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public List<Solicitacao> findByStatusAndIdFilial(Long idFilial) {
        return repository.findByStatusEqualsAndStatusPedidoEqualsAndFilial_idFilial(1, 0, idFilial);
    }
    public Solicitacao insert(Solicitacao solicitacao) {
        Solicitacao solicitacaoSave = solicitacao;
        solicitacaoSave = repository.save(solicitacao);

        solicitacaoSave.setNumeroSol(solicitacaoSave.getIdSol()); //faz update inserindo numero da solicitação
        
        itemRepository.saveAll(solicitacao.getItensSolicitados());
        return solicitacaoSave;
    }

    public void update(Long id, Solicitacao solicitacao) {
        Solicitacao entity = repository.getReferenceById(id);
        updateData(entity, solicitacao);
        repository.save(entity);
    }
    
    public void recebimentoUpdateStatus(Long id, Solicitacao solicitacao, Instant data) {
        Solicitacao entity = repository.getReferenceById(id);
        updateDataStatus(entity, solicitacao, data);
        repository.save(entity);
    }
    
    private void updateDataStatus(Solicitacao entity, Solicitacao solicitacao, Instant data) {
        entity.setUpdatedAt(data);
        entity.setStatusPedido(PedidoStatusOption.RECEBIDO);
    }
    private void updateData(Solicitacao entity, Solicitacao solicitacao) {
        entity.setStatus(solicitacao.getStatus());
        entity.setUpdatedAt(solicitacao.getUpdatedAt());
        entity.setStatusPedido(solicitacao.getStatusPedido());
    }

    public Solicitacao fromDto(SolicitacaoDTO dto) {
        Solicitacao solicitacao = new Solicitacao();
        Filial filial = filialService.findById(dto.getFilialFK());
        Usuario usuario = usuarioService.findById(dto.getSolicitanteFK());

        solicitacao.setIdSol(dto.getIdSol());
        solicitacao.setDataSolicitacao(dto.getDataSolicitacao());
        solicitacao.setSolicitante(usuario);
        solicitacao.setFilial(filial);
        solicitacao.setStatus(dto.getStatus());
        solicitacao.setStatusPedido(dto.getStatusPedido());
        solicitacao.setUpdatedAt(dto.getUpdatedAt());
        List<ItemSolicitacao> itens = dto.getItensSolicitacao().stream().map(x -> {
            ItemSolicitacao item = new ItemSolicitacao();
            item.setSolicitacao(solicitacao);
            item.setProduto(x.getProduto());
            
            item.setObservacao(x.getObservacao());
            item.setQuantidade(x.getQuantidade());
            return item;
        }).collect(Collectors.toList());

        solicitacao.AddItensSolicitados(itens.stream().collect(Collectors.toSet()));
        return solicitacao;
    }
}