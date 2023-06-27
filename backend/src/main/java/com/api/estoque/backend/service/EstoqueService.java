package com.api.estoque.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.api.estoque.backend.model.Estoque;
import com.api.estoque.backend.repository.EstoqueRepository;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service

public class EstoqueService {
    
    @Autowired
    private EstoqueRepository repository;

    public List<Estoque> findAll() {
        return repository.findAll();
    }
    
    public Estoque findById(Long id) {
        Optional<Estoque> estoque = repository.findById(id);
        return estoque.orElseThrow(() -> new ResourceNotFoundException(id));
    }

}
