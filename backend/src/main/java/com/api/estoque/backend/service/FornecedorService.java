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

import com.api.estoque.backend.dto.FornecedorDTO;
import com.api.estoque.backend.model.Endereco;
import com.api.estoque.backend.model.Fornecedor;
import com.api.estoque.backend.repository.EnderecoRepository;
import com.api.estoque.backend.repository.FornecedorRepository;
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ModelException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
public class FornecedorService {
    
    @Autowired
    private FornecedorRepository repository;
    
    @Autowired
    private EnderecoRepository enderecoRepository;
    
    public Page<Fornecedor> findByNameContaining(String name,  Pageable pageable) {
        return repository.findByNameContaining(name, pageable);
    }
    
    public List<Fornecedor> findAll() {
        return repository.findAll();
    }
    public Fornecedor findById(Long id) {
        Optional<Fornecedor> filial = repository.findById(id);
        return filial.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Fornecedor insert(Fornecedor fornecedor) {
        Fornecedor newFornecedor;
        
        Endereco endereco = enderecoRepository.save(fornecedor.getEndereco());
        
        newFornecedor = repository.save(fornecedor);
        updateEnderecoAfterSave(endereco, newFornecedor);

        return newFornecedor;
    }

    private void updateEnderecoAfterSave(Endereco entity, Fornecedor fornecedorEntity) {
        try {
            Endereco enderecoEntity = enderecoRepository.getReferenceById(entity.getIdEndereco());
            enderecoEntity.setLogradouro(entity.getLogradouro());
            enderecoEntity.setCep(entity.getCep());
            enderecoEntity.setCidade(entity.getCidade());
            enderecoEntity.setEstado(entity.getEstado());
            enderecoEntity.setNumero(entity.getNumero());
            enderecoEntity.setComplemento(entity.getComplemento());
            enderecoEntity.setFornecedor(fornecedorEntity);
            enderecoRepository.save(enderecoEntity);
        }
        catch (EntityNotFoundException e) {
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

    public Fornecedor update(Long id, Fornecedor fornecedor) {
        try {
            Fornecedor entity = repository.getReferenceById(id);
            updateEnderecoAfterSave(fornecedor.getEndereco(), fornecedor);
            updateData(entity, fornecedor);
            return repository.save(entity);
        } 
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    public void updateData(Fornecedor entity, Fornecedor fornecedor) {
        entity.setName(fornecedor.getName());
        entity.setCnpj(fornecedor.getCnpj());
        entity.setEmail(fornecedor.getEmail());
        entity.setPhoneNumber(fornecedor.getPhoneNumber());
        entity.setStatus(fornecedor.getStatus());
        entity.setEndereco(fornecedor.getEndereco());
    }

    public Fornecedor fromDto(FornecedorDTO objDto) {
        return fornecedorExists(objDto);
    }

    public Fornecedor fornecedorExists(FornecedorDTO objDto) {
        Optional<Fornecedor> fornecedor;

        if(objDto.getIdFornecedor() == null) {
            fornecedor = repository.findByNameAndCnpj(objDto.getName(), objDto.getCnpj());
        } 
        else {
            fornecedor = repository
            .findByNameAndCnpjAndIdFornecedorNot(
                objDto.getName(), 
                objDto.getCnpj(), objDto.getIdFornecedor()
            );
        }

        if(fornecedor.isEmpty()) {
            return new Fornecedor(
                objDto.getIdFornecedor(),
                objDto.getName(),
                objDto.getCnpj(),
                objDto.getEmail(),
                objDto.getPhoneNumber(),
                objDto.getStatus(),
                objDto.getEndereco()
            );
        } 
        else {
            throw new ModelException("Fornecedor [Nome: "+objDto.getName()+" CNPJ/CPF: "+objDto.getCnpj()+"] já cadastrado!");
        }
    }

    public Endereco enderecoFornecedorExists(Fornecedor objFornecedor) {
        Optional<Endereco> enderecoOpt;
        if(objFornecedor.getIdFornecedor() == null) 
        {
            enderecoOpt = enderecoRepository.findByCepAndEstadoAndLogradouroAndNumeroAndComplementoAndCidade(
                objFornecedor.getEndereco().getCep(), 
                objFornecedor.getEndereco().getEstado(), 
                objFornecedor.getEndereco().getLogradouro(), 
                objFornecedor.getEndereco().getNumero(),
                objFornecedor.getEndereco().getComplemento(),
                objFornecedor.getEndereco().getCidade()
            );
        }
        else {
            enderecoOpt = enderecoRepository
            .findByCepAndEstadoAndLogradouroAndNumeroAndComplementoAndCidadeAndFornecedorNot(   
                objFornecedor.getEndereco().getCep(), 
                objFornecedor.getEndereco().getEstado(), 
                objFornecedor.getEndereco().getLogradouro(),
                objFornecedor.getEndereco().getNumero(),
                objFornecedor.getEndereco().getComplemento(),
                objFornecedor.getEndereco().getCidade(),
                objFornecedor
            );
        }

        if(enderecoOpt.isEmpty()) 
        {
            return new Endereco(
                null, 
                objFornecedor.getEndereco().getLogradouro(), 
                objFornecedor.getEndereco().getCep(), 
                objFornecedor.getEndereco().getNumero(), 
                objFornecedor.getEndereco().getComplemento(), 
                objFornecedor.getEndereco().getCidade(), 
                objFornecedor.getEndereco().getEstado()
            );
        } 
        else 
        {
            throw new ModelException("Endereço já cadastrado!");
        }
    }
}
