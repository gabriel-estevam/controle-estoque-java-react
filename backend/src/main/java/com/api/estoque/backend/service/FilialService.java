package com.api.estoque.backend.service;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.dto.FilialDTO;
import com.api.estoque.backend.model.Endereco;
import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.repository.EnderecoRepository;
import com.api.estoque.backend.repository.FilialRepository;
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ModelException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
public class FilialService {
    
    @Autowired
    private FilialRepository repository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    public Page<Filial> findByNameContaining(String name,  Pageable pageable) {
        return repository.findByNameContaining(name, pageable);
    }
    
    public Filial findById(Long id) {
        Optional<Filial> filial = repository.findById(id);
        return filial.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Filial insert(Filial filial) {
        Filial newFilial;
        Endereco endereco = enderecoRepository.save(filial.getEndereco());
        //return repository.save(filial);
        newFilial = repository.save(filial);
        updateEnderecoAfterSave(endereco,newFilial);
        return newFilial;
    }
    
    private void updateEnderecoAfterSave(Endereco entity, Filial filialEntity) {
        try {
            Endereco enderecoEntity = enderecoRepository.getReferenceById(entity.getId());
            enderecoEntity.setEndereco(entity.getEndereco());
            enderecoEntity.setCep(entity.getCep());
            enderecoEntity.setCidade(entity.getCidade());
            enderecoEntity.setEstado(entity.getEstado());
            enderecoEntity.setNumero(entity.getNumero());
            enderecoEntity.setComplemento(entity.getComplemento());
            enderecoEntity.setFilial(filialEntity);
            enderecoRepository.save(enderecoEntity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(entity.getId());
        }
        
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
        entity.setEndereco(filial.getEndereco());
    }

    public Filial fromDto(FilialDTO objDto) {
        return filialExists(objDto);
    }

    public Filial filialExists(FilialDTO objDto) {
        Optional<Filial> filial = repository.findByCnpj(objDto.getCnpj());
        if(filial.isEmpty()) {
            return new Filial(objDto.getId(), 
                              objDto.getName(), 
                              objDto.getPhoneNumber(), 
                              objDto.getCnpj(), 
                              objDto.getStatus());
        }
        throw new ModelException("Filial com CNPJ ["+objDto.getCnpj()+"] já cadastrado!");
    }

    public Endereco enderecoFilialExists(Endereco endereco) {
        int countEndereco = enderecoRepository.findByCepAndEstado(endereco.getCep());
        if(countEndereco > 0) {
            throw new ModelException("Endereço com CEP["+endereco.getCep()+"] já cadastrado!");
        }

        return new Endereco(null, 
                            endereco.getEndereco(), 
                            endereco.getCep(), 
                            endereco.getNumero(), 
                            endereco.getComplemento(), 
                            endereco.getCidade(), 
                            endereco.getEstado());
    }
}
