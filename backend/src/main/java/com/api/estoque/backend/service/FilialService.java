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

    public List<Filial> findAll() {
        return repository.findAll();
    }
    
    public Filial findById(Long id) {
        Optional<Filial> filial = repository.findById(id);
        return filial.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Filial insert(Filial filial) {
        Filial newFilial;
        
        Endereco endereco = enderecoRepository.save(filial.getEndereco());

        newFilial = repository.save(filial);
        updateEnderecoAfterSave(endereco,newFilial);
        return newFilial;
    }
    
    private void updateEnderecoAfterSave(Endereco entity, Filial filialEntity) {
        try 
        {
            Endereco enderecoEntity = enderecoRepository.getReferenceById(entity.getIdEndereco());
            enderecoEntity.setLogradouro(entity.getLogradouro());
            enderecoEntity.setCep(entity.getCep());
            enderecoEntity.setCidade(entity.getCidade());
            enderecoEntity.setEstado(entity.getEstado());
            enderecoEntity.setNumero(entity.getNumero());
            enderecoEntity.setComplemento(entity.getComplemento());
            enderecoEntity.setFilial(filialEntity);
            enderecoRepository.save(enderecoEntity);
        }
        catch (EntityNotFoundException e) 
        {
            throw new ResourceNotFoundException(entity.getIdEndereco());
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
            updateEnderecoAfterSave(filial.getEndereco(),filial);
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
        Optional<Filial> filial;
        if(objDto.getIdFilial() == null) {
            filial = repository.findByCnpj(objDto.getCnpj());
        } else {
            filial = repository.findByCnpjAndIdFilialNot(objDto.getCnpj(), objDto.getIdFilial());
        }

        if(filial.isEmpty()) {
            return new Filial(
                objDto.getIdFilial(), 
                objDto.getName(), 
                objDto.getPhoneNumber(), 
                objDto.getCnpj(), 
                objDto.getStatus(),
                objDto.getEndereco()
            );
        } 
        else {
            throw new ModelException("Filial com CNPJ ["+objDto.getCnpj()+"] já cadastrado!");
        }
    }

   public Endereco enderecoFilialExists(Filial objFilial) {
        Optional<Endereco> enderecoOpt;
        if(objFilial.getIdFilial() == null) {
            enderecoOpt = enderecoRepository
            .findByCepAndEstadoAndLogradouroAndNumeroAndComplementoAndCidade
            (                
                objFilial.getEndereco().getCep(), 
                objFilial.getEndereco().getEstado(), 
                objFilial.getEndereco().getLogradouro(), 
                objFilial.getEndereco().getNumero(),
                objFilial.getEndereco().getComplemento(),
                objFilial.getEndereco().getCidade()
            );
        }
        else {
            enderecoOpt = enderecoRepository
            .findByCepAndEstadoAndLogradouroAndNumeroAndComplementoAndCidadeAndFilialNot
            (   objFilial.getEndereco().getCep(), 
                objFilial.getEndereco().getEstado(), 
                objFilial.getEndereco().getLogradouro(),
                objFilial.getEndereco().getNumero(),
                objFilial.getEndereco().getComplemento(),
                objFilial.getEndereco().getCidade(),
                objFilial
            );
        }
        if(enderecoOpt.isEmpty()) {
            return new Endereco(
                null, 
                objFilial.getEndereco().getLogradouro(), 
                objFilial.getEndereco().getCep(), 
                objFilial.getEndereco().getNumero(), 
                objFilial.getEndereco().getComplemento(), 
                objFilial.getEndereco().getCidade(), 
                objFilial.getEndereco().getEstado()
            );
        } 
        else {
            throw new ModelException("Endereço já cadastrado em outro Filial!");
        }
    }
}
