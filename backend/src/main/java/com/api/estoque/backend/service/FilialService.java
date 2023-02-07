package com.api.estoque.backend.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.repository.FilialRepository;
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
public class FilialService {
    
    @Autowired
    private FilialRepository repository;

    public List<Filial> findAll() {
        return repository.findAll();
    }

    public Filial findById(Long id) {
        Optional<Filial> filial = repository.findById(id);
        return filial.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Filial insert(Filial filial){
        return repository.save(filial);
    }
    
    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataBaseException(e.getMessage());
        }
    }

    public Filial update(Long id, Filial filial) {
        try {
            Filial entity = repository.getReferenceById(id);
            updateData(entity, filial);
            return repository.save(entity);
        } 
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    public void updateData(Filial entity, Filial filial) {
        entity.setName(filial.getName());
        entity.setCnpj(filial.getCnpj());
        entity.setPhoneNumber(filial.getPhoneNumber());
        entity.setStatusFilial(filial.getStatusFilial());
    }
}
