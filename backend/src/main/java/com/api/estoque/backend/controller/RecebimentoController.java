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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.api.estoque.backend.dto.RecebimentoDTO;
import com.api.estoque.backend.model.Recebimento;
import com.api.estoque.backend.service.RecebimentoService;

@RestController
@RequestMapping(value = "api/recebimento")
public class RecebimentoController {
    
    @Autowired
    private RecebimentoService service;

    @GetMapping
    public ResponseEntity<Page<Recebimento>> 
    findByNumeroSol(
        @RequestParam(name = "numeroSol", required =  false) Long numeroSol,
        @RequestParam(name = "idFilial", required = false) Long filial,
        @PageableDefault(sort = "Solicitacao_idSol", direction = Direction.ASC) Pageable pageable
    ) 
    {
        Page<Recebimento> page;
        
        if(numeroSol == null) {
            page = service.findByFilial(filial, pageable);
        }
        else {
            page = service.findByNumeroSol(numeroSol, filial, pageable);
        }

        return ResponseEntity.ok().body(page);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Recebimento> findById(@PathVariable Long id) {
        Recebimento recebimento = service.findById(id);
        return ResponseEntity.ok().body(recebimento);
    }

    @GetMapping("/all")
    public ResponseEntity<List<RecebimentoDTO>> findAll() {
        List<Recebimento> list = service.findAll();
        List<RecebimentoDTO> listDto = list.stream().map(x -> new RecebimentoDTO(x)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }

   @PostMapping
    public ResponseEntity<Void> insert(@RequestBody RecebimentoDTO dto) {

        Recebimento recebimento = service.fromDto(dto);
        
        recebimento = service.insert(recebimento);
        
        URI uri = ServletUriComponentsBuilder
        .fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(recebimento.getIdRecebimento())
        .toUri();
        return ResponseEntity.created(uri).build();
    }

}
