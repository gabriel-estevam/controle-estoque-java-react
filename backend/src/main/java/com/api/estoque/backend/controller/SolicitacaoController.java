package com.api.estoque.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.api.estoque.backend.dto.ItemSolicitacaoDTO;
import com.api.estoque.backend.dto.SolicitacaoDTO;
import com.api.estoque.backend.dto.UserDTO;
import com.api.estoque.backend.model.Solicitacao;
import com.api.estoque.backend.service.ProdutoService;
import com.api.estoque.backend.service.SolicitacaoService;
import com.api.estoque.backend.service.UserService;

@RestController
@RequestMapping(value = "api/solicitacao")
public class SolicitacaoController {
    
    @Autowired
    private SolicitacaoService service;
    
    @Autowired
    private UserService usuarioService;
    
    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public ResponseEntity<List<Solicitacao>> findAll() {
        List<Solicitacao> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

   @PostMapping
    public ResponseEntity<Void> insert(@RequestBody SolicitacaoDTO dto) {
        UserDTO usuarioDTO = new UserDTO(usuarioService.findById(dto.getSolicitanteFK()));        
        dto.setSolicitante(usuarioDTO);

        List<ItemSolicitacaoDTO> list = dto.getItensSolicitacao().stream().map(x -> {
            ItemSolicitacaoDTO item = new ItemSolicitacaoDTO();
            item.setProduto(produtoService.findById(x.getProdutoFK()));
            item.setQuantidade(x.getQuantidade());
            item.setObservacao(x.getObservacao());
            return item;
        }).collect(Collectors.toList());

        dto.setItensSolicitacao(list.stream().collect(Collectors.toSet()));
        
        Solicitacao solicitacao = service.fromDto(dto);
        
        solicitacao = service.insert(solicitacao);
        
        URI uri = ServletUriComponentsBuilder
        .fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(solicitacao.getIdSol())
        .toUri();
        return ResponseEntity.created(uri).build();
    }

}
