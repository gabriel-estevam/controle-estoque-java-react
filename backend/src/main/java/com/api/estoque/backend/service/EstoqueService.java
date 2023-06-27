package com.api.estoque.backend.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import com.api.estoque.backend.dto.EstoqueDTO;
import com.api.estoque.backend.model.Estoque;
import com.api.estoque.backend.repository.EstoqueRepository;

import com.api.estoque.backend.model.Material;
import com.api.estoque.backend.repository.MaterialRepository;

import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ModelException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service

public class EstoqueService {
    
    @Autowired
    private EstoqueRepository repository;

    public Page<Estoque> findByNameContaining(String produto,  Pageable pageable) {
        return repository.findByProdutoContaining(produto, pageable);
    }

    public List<Estoque> findAll() {
        return repository.findAll();
    }
    
    public Estoque findById(Long id) {
        Optional<Estoque> WareHouse = repository.findById(id);
        return WareHouse.orElseThrow(() -> new ResourceNotFoundException(id));
    }
    
}
