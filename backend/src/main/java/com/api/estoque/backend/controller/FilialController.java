package com.api.estoque.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.estoque.backend.dto.FilialDTO;
import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.service.FilialService;

@RestController
@RequestMapping(value = "api/filiais")
public class FilialController {

    @Autowired
    private FilialService service;


    @GetMapping
    public ResponseEntity<List<FilialDTO>> findAll() {
        List<Filial> list = service.findAll();
        List<FilialDTO> listDto = list.stream().map(parseDto -> new FilialDTO(parseDto)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<FilialDTO> findByID(@PathVariable Long id) {
        Filial filial = service.findById(id);
        return ResponseEntity.ok().body(new FilialDTO(filial));
    }
}
