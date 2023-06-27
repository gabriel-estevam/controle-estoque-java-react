package com.api.estoque.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.api.estoque.backend.model.Estoque;
import com.api.estoque.backend.service.EstoqueService;

@RestController
@RequestMapping(value = "api/estoque")
public class EstoqueController {
    @Autowired
    private EstoqueService estoque;

    @GetMapping("/all")
    public ResponseEntity<List<Estoque>> findAll() {
        List<Estoque> list = estoque.findAll();
        return ResponseEntity.ok().body(list);
    }
}