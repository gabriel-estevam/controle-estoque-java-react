package com.api.estoque.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<Page<Solicitacao>> 
    findByNumeroSol(
        @RequestParam(name = "numeroSol", required =  false) Long numeroSol,
        @RequestParam(name = "idFilial", required = false) Long filial,
        @PageableDefault(sort = "idSol", direction = Direction.ASC) Pageable pageable
    ) 
    {
        Page<Solicitacao> page;
        if(numeroSol == null) {
            page = service.findByFilial(filial, pageable);
        }
        
        page = service.findByNumeroSol(numeroSol, filial, pageable);
        return ResponseEntity.ok().body(page);
    }

    @GetMapping("/all")
    public ResponseEntity<List<SolicitacaoDTO>> findAll() {
        List<Solicitacao> list = service.findAll();
        List<SolicitacaoDTO> listDto = list.stream().map(x -> new SolicitacaoDTO(x)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
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

    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody SolicitacaoDTO dto) {
        dto.setIdSol(id);
        Solicitacao solicitacao = service.fromDto(dto);
        service.update(id, solicitacao);
        return ResponseEntity.noContent().build();
    }
}
