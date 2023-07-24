package com.api.estoque.backend.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.api.estoque.backend.dto.EstoqueSaidaDTO;
import com.api.estoque.backend.model.EstoqueSaida;
import com.api.estoque.backend.service.EstoqueSaidaService;

@Controller
@RequestMapping(value = "api/estoque/saida")
public class EstoqueSaidaController {
    @Autowired
    private EstoqueSaidaService service;

    @GetMapping(value = "/{id}")
    public ResponseEntity<EstoqueSaidaDTO> findById(@PathVariable Long id) {
        EstoqueSaida estoqueSaida = service.findById(id);
        EstoqueSaidaDTO dto = new EstoqueSaidaDTO(estoqueSaida);
        return ResponseEntity.ok().body(dto);
    }
    
    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody EstoqueSaidaDTO dto) {
        EstoqueSaida estoque = service.fromDto(dto);
        estoque = service.insert(estoque);

        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(estoque.getId())
            .toUri(); 
        return ResponseEntity.created(uri).build();
    }
}
