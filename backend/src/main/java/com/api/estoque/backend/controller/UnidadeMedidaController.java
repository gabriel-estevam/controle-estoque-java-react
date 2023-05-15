package com.api.estoque.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.estoque.backend.model.UnidadeMedida;
import com.api.estoque.backend.repository.UnidadeMedidaRepository;

@RestController
@RequestMapping(value = "api/unidadeMedida")
public class UnidadeMedidaController {

    @Autowired
    UnidadeMedidaRepository repository;

    @GetMapping
    public ResponseEntity<Page<UnidadeMedida>> 
    findByUnidadeMedidaContaining( @RequestParam(name = "unidadeMedida", required = false) String nome, 
                          @PageableDefault(sort = "idUnidadeMedida", direction = Direction.ASC) Pageable pageable) {
        Page<UnidadeMedida> page = repository.findByUnidadeMedidaContaining(nome, pageable);
        return ResponseEntity.ok().body(page);
    
    }
    @GetMapping("/all")
    public ResponseEntity<List<UnidadeMedida>> 
    findAll() {
        List<UnidadeMedida> list = repository.findAll();
        return ResponseEntity.ok().body(list);
    }
    
}
