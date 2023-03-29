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

import com.api.estoque.backend.dto.FilialDTO;
import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.repository.FilialRepository;
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ModelException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
public class FilialService {
    
    @Autowired
    private FilialRepository repository;

    public Page<Filial> findByNameContaining(String name,  Pageable pageable) {
        return repository.findByNameContaining(name, pageable);
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
        entity.setStatus(filial.getStatus());
        entity.setUsuario(filial.getUsuario());
    }

    public Filial fromDto(FilialDTO objDto) {
        return filialExists(objDto);
    }

    public Filial filialExists(FilialDTO objDto) {
        Optional<Filial> filial = repository.findByCnpj(objDto.getCnpj());
        if(filial.isEmpty() || objDto.getId() == null) {
            return new Filial(objDto.getId(), 
                              objDto.getName(), 
                              objDto.getPhoneNumber(), 
                              objDto.getCnpj(), 
                              objDto.getStatus());
        }
        throw new ModelException("Filial com CNPJ ["+objDto.getCnpj()+"] já cadastrado!");
    }
}
