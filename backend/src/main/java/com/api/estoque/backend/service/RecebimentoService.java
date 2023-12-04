package com.api.estoque.backend.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.dto.RecebimentoDTO;
import com.api.estoque.backend.model.EstoqueEntrada;
import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.model.ItemSolicitacao;
import com.api.estoque.backend.model.Recebimento;
import com.api.estoque.backend.model.Solicitacao;
import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.repository.RecebimentoRepository;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
public class RecebimentoService {
    
    @Autowired
    private RecebimentoRepository repository;

    @Autowired
    private FilialService filialService;

    @Autowired
    private UserService usuarioService;

    @Autowired
    private SolicitacaoService solicitacaoService;

    @Autowired
    private EstoqueEntradaService estoqueService;

    public Page<Recebimento> findByNumeroSol(Long numeroSol, Long filial, Pageable pageable) {
        return repository.findBySolicitacao_NumeroSolAndFilial_idFilial(numeroSol, filial,pageable);
    }

    public Page<Recebimento> findByFilial(Long filial, Pageable pageable) {
        return repository.findByFilial_idFilial(filial, pageable);
    }

    public List<Recebimento> findAll() {
        return repository.findAll();
    }

    public Recebimento findById(Long id) {
        Optional<Recebimento> recebimento = repository.findById(id);
        return recebimento.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Recebimento insert(Recebimento recebimento) {
       // int itemCount = recebimento.getSolicitacao().getItensSolicitados().size();
        //if(itemCount > 1) {
        List<ItemSolicitacao> list = recebimento.getSolicitacao().getItensSolicitados().stream().toList();

        for(int i =0; i < list.size(); i++) {
            ItemSolicitacao item = list.get(i);

            Long idProduto = item.getSolicitacao().getItensSolicitados().stream().toList().get(i).getProduto().getIdProduto();
            Double qtdSol = item.getSolicitacao().getItensSolicitados().stream().toList().get(i).getQuantidade();
            EstoqueEntrada entrada = estoqueService.findByIdFilial(recebimento.getFilial().getIdFilial(), idProduto);

            estoqueService.recebimentoMaterial(
                entrada, 
                qtdSol, 
                recebimento.getDataEntrada()
            );
        }
        //}
        Long idSol = recebimento.getSolicitacao().getIdSol();
        Solicitacao entity = recebimento.getSolicitacao();
        Instant data = recebimento.getDataEntrada();
        solicitacaoService.recebimentoUpdateStatus(idSol, entity, data);
        return repository.save(recebimento);
    }
    
    public Recebimento fromDto(RecebimentoDTO dto) {
        Recebimento recebimento = new Recebimento();
        Filial filial = filialService.findById(dto.getFilialFK());
        Usuario usuario = usuarioService.findById(dto.getUsuarioFK());
        Solicitacao solicitacao = solicitacaoService.findById(dto.getSolicitacaoFK());

        recebimento.setIdRecebimento(dto.getIdRecebimento());
        recebimento.setDataEntrada(dto.getDataEntrada());
        recebimento.setNotaEntrada(dto.getNotaEntrada());
        recebimento.setObservacao(dto.getObservacao());

        recebimento.setUsuario(usuario);
        recebimento.setFilial(filial);
        recebimento.setSolicitacao(solicitacao);
        return recebimento;
    }
}